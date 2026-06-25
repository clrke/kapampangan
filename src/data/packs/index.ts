import type { ContentPack } from '../types'
import numbers from './numbers.json'
import family from './family.json'
import food from './food.json'
import colors from './colors.json'
import house from './house.json'
import verbs from './verbs.json'

/**
 * Additional content packs, aggregated into the global dictionary & lessons.
 * Each pack is a JSON file whose lessons teach exactly its entries.
 * Register new packs here as they are added.
 */
export const extraPacks: ContentPack[] = [
  numbers as ContentPack,
  family as ContentPack,
  food as ContentPack,
  colors as ContentPack,
  house as ContentPack,
  verbs as ContentPack,
]
