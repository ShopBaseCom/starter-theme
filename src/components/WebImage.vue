<template>
  <img
    v-if="!$isPreview && isLazy"
    v-lazy="lazy"
    :class="['sb-lazy', { progressive: progressive }]"
    v-bind="src && progressive ? { src: urlSrc('0', '150') } : {}"
    :alt="alt"
    :sizes="sizes"
    :data-srcset="urlSrcSet"
    @click="$emit('click')"
    @load="$emit('load')"
  />
  <img
    v-else
    :src="error ? lazy.error : lazy.src"
    :alt="alt"
    :sizes="srcResolution ? null : sizes"
    :srcset="error ? lazy.error : urlSrcSet"
    @click="$emit('click')"
    @load="$emit('load')"
    @error="error = true"
  />
</template>

<script>
import getDefaultImages from '../utils/defaultImages'
export default {
  name: 'WebImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
      default: '',
    },
    width: {
      type: String,
      required: false,
      default: '',
    },
    height: {
      type: String,
      required: false,
      default: '',
    },
    crop: {
      type: String,
      required: false,
      default: '',
    },
    isLazy: {
      type: Boolean,
      required: false,
      default: true,
    },
    srcResolution: {
      type: Boolean,
      required: false,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    progressive: {
      type: Boolean,
      default: false,
    },
    sizes: {
      type: String,
      default: 'auto',
    },
    square: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      error: false,
    }
  },
  computed: {
    lazy() {
      return {
        src: this.urlSrc(this.height, this.width),
        loading: this.progressive ? this.urlSrc('0', '150') : '',
        error: this.small ? this.smallFallbackSrc : this.fallbackSrc,
      }
    },
    fallbackSrc() {
      return getDefaultImages('productPlaceholder')
    },
    smallFallbackSrc() {
      return getDefaultImages('smallProductPlaceholder')
    },
    urlSrc() {
      return (height, width, scale = '') => {
        return this.$resizeImage(this.src, height, width, this.crop, scale)
      }
    },
    urlSrcSet() {
      if (this.src === '') {
        return ''
      }

      // Support request resolution
      if (this.srcResolution) {
        const width = this.width || '180'
        const height = this.height || '180'
        const getImgSrc = (scale = false) => {
          const heightImg = this.square ? width : height
          return this.urlSrc(heightImg, width, scale ? 'x2' : '')
        }
        if (!this.isLazy) {
          return `${getImgSrc()} 1x, ${getImgSrc(true)} 2x`
        } else {
          return `${getImgSrc()} ${width}w, ${getImgSrc(true)} ${width * 2}w`
        }
      }

      const screen = [180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]
      const srcScreen = []
      let srcSet = ''

      for (const key of screen) {
        srcScreen.push(`${this.urlSrc(this.square ? key : '0', key)} ${key}w`)
      }
      srcSet = srcScreen.join(', ')
      return srcSet
    },
  },
  watch: {
    src: function() {
      this.error = false
    },
  },
}
</script>
