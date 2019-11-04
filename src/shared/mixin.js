let coreMixins = {}

/**
 * Get mixins
 * @param mixins
 * @return {*}
 */
export const setCoreMixins = (mixins) => (coreMixins = mixins)

/**
 * Get core mixin
 * @param mixin
 * @return {*|{}}
 */
export const getCoreMixin = (mixin) => {
  return coreMixins[mixin] || {}
}
