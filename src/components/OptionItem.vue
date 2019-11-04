<template>
  <component
    :is="typeSelector === 'button' ? 'button' : 'web-image'"
    v-bind="config"
    @click="onChangeOption(changeOptionValue)"
  >
    <template v-if="!isColorSwatches">
      {{ value.label }}
    </template>
  </component>
</template>

<script>
export default {
  name: 'ProductSelector',
  props: {
    code: {
      type: String,
      required: true,
      default: '',
    },
    value: {
      type: Object,
      required: true,
      default: () => {},
    },
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: true,
      default: false,
    },
    src: {
      type: String,
      default: '',
    },
    typeSelector: {
      type: String,
      default: 'button',
    },
    color: {
      type: String,
      required: false,
      default: '',
    },
    onChangeOption: {
      type: Function,
      required: true,
      default: () => {},
    },
  },
  computed: {
    isColorSwatches() {
      return !!this.color
    },
    style() {
      return this.isColorSwatches ? { backgroundColor: this.color } : {}
    },
    changeOptionValue() {
      return {
        id: this.value.id,
        code: this.code,
        label: this.value.label,
      }
    },
    config() {
      if (this.typeSelector === 'button') {
        return {
          class: [
            'product__option',
            {
              'product__option--active': this.active,
              'product__option--out-of-stock': this.disabled,
              'product__option--color-swatches': this.isColorSwatches,
            },
          ],
          disabled: this.disabled,
          ariaLabel: this.$t(`Select ${this.value.label}`),
          style: this.style,
        }
      }

      return {
        width: '180',
        height: '0',
        sizes: '180px',
        class: [
          this.typeSelector === 'slider'
            ? this.sliderClasses
            : this.imageClasses,
        ],
        isLazy: false,
        srcResolution: true,
        src: this.src,
        alt: this.value.label,
      }
    },
    imageClasses() {
      return {
        'product__image-option': true,
        'product__image-option--active': this.active,
        'product__image-option--out-of-stock': this.disabled,
      }
    },
    sliderClasses() {
      return {
        'image-selector-slider__option': true,
        'image-selector-slider__option--active': this.active,
        'image-selector-slider__option--out-of-stock': this.disabled,
      }
    },
  },
}
</script>
