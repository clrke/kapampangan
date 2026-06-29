import { describe, expect, it } from 'vitest'
import { dictionary } from '../src/data/dictionary'
import { tokenize } from '../src/lib/tokenizer'

/**
 * GUARD: "no word in an example sentence is silently undefined".
 *
 * Why this test exists
 * --------------------
 * The dictionary-coverage tests guarantee a bijection between *dictionary
 * entries* and *lessons* — every definition is taught, every taught id is
 * defined. But they say NOTHING about the free text inside example sentences.
 * That is exactly how `la` and `reng` (a pronoun and an article) sat in
 * `Atlu la reng anak.` untappable for a long time: they were never *entries*,
 * so no entry-vs-lesson test had anything to assert about them.
 *
 * This test closes that hole from the TEXT side: it tokenizes every example
 * `.kp` string and fails if any Kapampangan token resolves to no dictionary
 * entry — UNLESS that token is on the explicit allow-list below.
 *
 * Why an allow-list (and not "define everything")
 * -----------------------------------------------
 * Kapampangan is agglutinative with heavy enclitics, reduplication, and free
 * spelling variation, so "every example token is a headword" is linguistically
 * impossible to satisfy honestly:
 *   - enclitic portmanteaus:   taku (ta+ku), ne (na+ya), namu, yang (ya+ng)
 *   - reduplications:          aldo-aldo, bengi-bengi, paru-paro
 *   - inflected verb forms:    mamangan, lumakad, magluto, sinali, tutulungan
 *   - spelling variants:       tao/tau, puso/pusu, libro/libru, adwang/aduang
 *   - proper nouns / loans:    Juan, Arayat, Maynila, Celsius, t-shirt
 *
 * The allow-list is therefore a REVIEWED REGISTRY OF KNOWN DEBT, not a dumping
 * ground. Its job: make every undefined token an explicit, conscious decision
 * so a NEW undefined word can never again slip in silently — the moment someone
 * writes an example with an unlisted undefined token, this test goes red.
 *
 * Some entries below are Tagalog intrusions (magandang, kaibigan, kumain,
 * naintindihan, pumunta, saan, kanimo, mabait, ...) — flagged here as the
 * backlog for a native-speaker accuracy pass; they are bugs to fix, not
 * Kapampangan to define.
 *
 * To shrink the debt: define a word in a content pack, then DELETE it here.
 * The "no stale entry" test below fails if you define something but forget to
 * remove it from the allow-list, so the registry can only get smaller.
 */

/** Proper nouns and loanword fragments that will never be headwords. */
const NAMES_AND_LOANS = [
  'angeles', 'arayat', 'carmen', 'celsius', 'degrees', 'elena', 'jose',
  'juan', 'kapampangan', 'maria', 'maynila', 'pedro', 't-shirt',
]

/**
 * Kapampangan backlog: inflected/derived forms, enclitic contractions,
 * reduplications, spelling variants, Tagalog intrusions to correct, and plain
 * content words not yet taught. Each is intentionally untaught FOR NOW.
 */
const KP_BACKLOG = [
  'aduang', 'adwang', 'akung', 'alang-alang', 'aldo-aldo', 'aldong', 'arkilan',
  'ating', 'atlung', 'atneng', 'atulan',
  'basaen', 'bayaran', 'bayung', 'bengi-bengi', 'binayad', 'binie',
  'binura', 'bukasan', 'bulak',
  'daka', 'dake', 'daká', 'dating', 'dening',
  'dinatang', 'dingna', 'dintang', 'dita', 'eme', 'gagawan',
  'gagewan', 'gamitan', 'gamiton', 'gawan', 'ginawa', 'gumawa',
  'hugasan', 'ibili', 'ibinie', 'ibiye', 'ibuklat', 'ibyan', 'inda', 'ining',
  'ipil', 'kalagu', 'kaming',
  'kapiganakan',
  'kasuyuan', 'keku',
  'kuwarta', 'labas', 'labhan', 'labuad', 'lagyan',
  'lako', 'linisan',
  'lubu-lubu', 'lulusong', 'lumakad', 'lumalukbad', 'lumaluksad', 'lumwal', 'luto', 'lutuan',
  'mabilisan', 'magbayad', 'magbie', 'maging', 'magkayli',
  'magluto', 'magobra', 'magpakalugud', 'magsalita', 'maguimbal', 'magwanan', 'makapantag',
  'makaputi', 'makatua', 'makatuang', 'makilabas', 'makita', 'mako', 'makulay', 'makulit',
  'malat', 'maitum', 'malaba', 'malipad',
  'maluad', 'malugay', 'mamangan', 'mangailangan', 'manghinga', 'mangutang',
  'maniarikit', 'mapaglugud', 'mapandaig', 'mapandilu', 'mapunta',
  'marelax', 'mative', 'matudtud',
  'mekita', 'mekublan', 'mengébun', 'meturan', 'meyari', 'mibili', 'miboto', 'migbebenta', 'migluto',
  'migsalita', 'migtutuk', 'miguran', 'mika', 'milukluk', 'mipapatudtud',
  'muran', 'múra', 'nabayad', 'naka', 'nang', 'nanung',
  'napalubus', 'napasar', 'napuputian', 'naulagang', 'ngening',
  'pagsarian', 'pakisuyo', 'palisan', 'palitan', 'pamagmula', 'pamagsabyan',
  'pane-neng',
  'pasalan', 'pong', 'pritung',
  'pung', 'ri',
  'sangdominggo', 'sasara', 'sinadsad', 'sinali',
  'sinalita', 'sinaul', 'susulat', 'susunud',
  'talaturung', 'tang',
  'tulog', 'tukud', 'tulungan', 'tumakbu', 'tumawag', 'tutuki', 'tutulung', 'tutulungan',
  'yang',
]

const ALLOWED_UNTAUGHT = new Set([...NAMES_AND_LOANS, ...KP_BACKLOG])

function undefinedTokensInExamples(): Map<string, string> {
  const found = new Map<string, string>() // token -> first example it appeared in
  for (const entry of dictionary) {
    for (const ex of entry.examples) {
      for (const tok of tokenize(ex.kp)) {
        if (tok.entry) continue
        const key = tok.text.trim().toLowerCase()
        if (!/[a-zà-ÿ]/i.test(key)) continue // skip pure punctuation/whitespace
        if (!found.has(key)) found.set(key, ex.kp)
      }
    }
  }
  return found
}

describe('example sentence coverage — no silently-undefined words', () => {
  it('every undefined token in an example is explicitly allow-listed', () => {
    const undefinedTokens = undefinedTokensInExamples()
    const offenders = [...undefinedTokens.entries()].filter(([w]) => !ALLOWED_UNTAUGHT.has(w))
    expect(
      offenders.map(([w, ex]) => `${w}  (in: "${ex}")`),
      'New undefined Kapampangan word(s) in example sentences. Either define them in a ' +
        'content pack, or — if they are names/contractions/variants — add them to the ' +
        'allow-list in tests/example-coverage.test.ts with a reason.',
    ).toEqual([])
  })

  it('the allow-list has no stale entries (a token that is now a real headword)', () => {
    const headwords = new Set(dictionary.map((e) => e.word.toLowerCase()))
    const stale = [...ALLOWED_UNTAUGHT].filter((w) => headwords.has(w))
    expect(
      stale,
      'These tokens are now defined dictionary headwords — remove them from the ' +
        'allow-list so the registry of known debt only ever shrinks.',
    ).toEqual([])
  })

  it('the allow-list has no entries that never appear undefined (dead weight)', () => {
    const undefinedTokens = new Set(undefinedTokensInExamples().keys())
    const dead = [...ALLOWED_UNTAUGHT].filter((w) => !undefinedTokens.has(w))
    expect(
      dead,
      'These allow-listed tokens no longer appear as undefined tokens in any example ' +
        '(example text changed?). Remove them to keep the list honest.',
    ).toEqual([])
  })
})
