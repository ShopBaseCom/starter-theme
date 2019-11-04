let coreFilters = {}

/**
 * set filters
 * @param filters
 * @return {*}
 */
export const setCoreFilters = (filters) => (coreFilters = filters)

/**
 * Get core filter
 * @param filter
 * @return {*|{}}
 */
export const getCoreFilter = (filter) => {
  return coreFilters[filter] || {}
}
