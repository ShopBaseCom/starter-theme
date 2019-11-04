<template>
  <div v-if="visible" class="roller-modal" @click="checkHide($event)">
    <div ref="body" class="roller-modal__body">
      <div class="roller-modal__body__icon-close" @click="handleClose()"></div>
      <div class="roller-modal__body__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleClose() {
      this.$emit('update:visible', false)
      this.$emit('close')
    },

    checkHide(event) {
      if (this.$refs.body && !this.$refs.body.contains(event.target)) {
        this.handleClose()
      }
    },
  },
}
</script>
