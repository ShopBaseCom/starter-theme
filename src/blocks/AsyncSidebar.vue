<template>
  <div class="blocked-async inline">
    <transition
      :name="
        direction === 'right'
          ? 'slide-left'
          : direction === 'left'
          ? 'slide-right'
          : null
      "
    >
      <div
        v-if="isOpen"
        class="mw-100 fixed sidebar-menu-wrap col-12"
        :class="[
          direction === 'left'
            ? 'left-sidebar'
            : direction === 'right'
            ? 'right-sidebar'
            : null,
          customClass,
        ]"
        data-testid="sidebar"
      >
        <component
          :is="component"
          @close="$emit('close')"
          @reload="getComponent"
        />
      </div>
    </transition>
    <div v-if="isOpen" class="sidebar-overlay"></div>
  </div>
</template>

<script>
export default {
  props: {
    asyncComponent: {
      type: Function,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    /** "right" or "left"  */
    direction: {
      type: String,
      default: 'left',
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      component: null,
    }
  },
  created() {
    this.getComponent()
  },
  methods: {
    getComponent() {
      this.component = () => ({
        component: this.asyncComponent(),
        timeout: 3000,
      })
    },
  },
}
</script>
