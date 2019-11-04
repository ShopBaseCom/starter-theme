<template>
  <div class="default-layout">
    <MaterialIcons />
    <CurrencyIcons />
    <MainHeader data-id="header" />
    <slot />
    <notification />
    <MainFooter data-id="footer" />
    <vue-progress-bar />
  </div>
</template>

<script>
import MaterialIcons from '../components/MaterialIcons'

export default {
  name: 'LayoutDefault',
  components: {
    MaterialIcons,
    CurrencyIcons: () => import('../components/CurrencyIcons'),
    MainFooter: () => import('../sections/Footer'),
    MainHeader: () => import('../sections/Header'),
  },
  beforeMount() {
    // Progress bar on top of the page
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start()
      this.$Progress.increase(40)
      next()
    })
    this.$router.afterEach(() => {
      this.$Progress.finish()
    })
  },
}
</script>
