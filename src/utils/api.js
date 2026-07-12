// Helpers to normalize the documents API responses.
//
// The backend returns `categories` as an object keyed by id
// (e.g. { "6": {...}, "36": {...} }) instead of a flat array, and it does
// not expose a top-level `documents` array — documents are nested inside
// each category's `documents` / `subcategories` trees.

export function normalizeCategories(value) {
  if (!value) return []
  if (Array.isArray(value)) return value
  if (typeof value === 'object') return Object.values(value)
  return []
}

export function flattenDocuments(categories) {
  const result = []
  const walk = (nodes) => {
    for (const node of normalizeCategories(nodes)) {
      if (Array.isArray(node.documents)) {
        for (const doc of node.documents) {
          result.push({ ...doc, categoryId: node.id, categoryTitle: node.title })
        }
      }
      walk(node.subcategories || node.sub_categories || node.children || node.child_categories || [])
    }
  }
  walk(categories)
  return result
}
