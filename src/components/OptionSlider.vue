<template>
  <ul class="image-selector-slider">
    <li
      v-for="(value, index) in values"
      :key="value.id"
      class="image-selector-slider__swatch-item"
      @click="onSelectSlide(index)"
    >
      <slot :value="value"></slot>
    </li>
  </ul>
</template>

<script>
import BezierEasing from 'bezier-easing'

export default {
  name: 'OptionSlider',
  props: {
    values: {
      type: Array,
      required: true,
      default: () => [],
    },
    currentOptionId: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  mounted() {
    this.$nextTick(() => {
      const activeSlideIndex = this.values.findIndex(
        (option) => option.id === this.currentOptionId
      )

      if (activeSlideIndex > -1) {
        this.onSelectSlide(activeSlideIndex)
      }
    })
  },
  methods: {
    scrollGroup(dom, p, startPoint, endPoint) {
      dom.scrollTo(startPoint + endPoint * p, 0)
    },
    animate(dom, render, duration, easing, startPoint, endPoint) {
      const start = Date.now()
      const loop = function() {
        let p = (Date.now() - start) / duration
        if (p > 1) {
          render(dom, 1, startPoint, endPoint)
        } else {
          requestAnimationFrame(loop)
          render(dom, easing(p), startPoint, endPoint)
        }
      }
      loop()
    },
    onSelectSlide(index) {
      const groupSwatch = document.querySelector('.image-selector-slider')
      const swatches = document.querySelectorAll(
        '.image-selector-slider__swatch-item'
      )
      const scrolledPoint = groupSwatch.scrollLeft
      const centerPoint =
        groupSwatch.offsetWidth / 2 - swatches[index].offsetWidth / 2
      const scrollLength =
        swatches[index].offsetLeft - scrolledPoint - centerPoint
      const easing = BezierEasing(0.25, 0.1, 0.0, 1.0)
      this.animate(
        groupSwatch,
        this.scrollGroup,
        400,
        easing,
        scrolledPoint,
        scrollLength
      )
    },
  },
}
</script>
