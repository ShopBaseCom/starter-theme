/**
 * Is diff two object
 * @param object1
 * @param object2
 * @returns {boolean}
 */
export const isObjectDiff = (object1, object2) => {
  return JSON.stringify(object1) !== JSON.stringify(object2)
}
