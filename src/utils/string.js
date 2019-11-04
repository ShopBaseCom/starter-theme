/**
 * Truncate text if text length longer than a value
 * @param str
 * @param limit
 */
export const truncate = (str, limit) => {
  if (str.length > limit) return str.substring(0, limit) + '...'
  else return str
}
