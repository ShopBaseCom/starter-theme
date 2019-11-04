<template>
  <ul
    id="AccessibleNav"
    :style="
      `padding-top: ${settings.main_menu_top_padding}px;
       padding-bottom: ${settings.main_menu_top_padding}px;`
    "
    :class="['site-nav m0 p0', { 'site-nav--hidden': navIndex === null }]"
  >
    <li
      v-for="item in navItems"
      :key="item.id"
      :class="[
        `site-nav__item m0`,
        { 'site-nav--has-dropdown': item.items && item.items.length },
      ]"
    >
      <LinkFormatter :link="item" class="site-nav__link p20 flex items-center">
        {{ item.name }}
        <span
          v-if="item.items && item.items.length"
          class="site-nav__icon"
          aria-hidden="true"
        ></span>
      </LinkFormatter>
      <MenuParent
        v-if="item.items && item.items.length"
        :child-items="item.items"
      ></MenuParent>
    </li>

    <li
      v-if="subNavItems.length"
      class="site-nav__item site-nav--has-dropdown site-nav--more-section m0"
    >
      <a href="javascript:void(0);" class="flex items-center">
        <span class="site-nav__more"></span>
      </a>

      <MenuParent :child-items="subNavItems"></MenuParent>
    </li>
  </ul>
</template>
<script>
import LinkFormatter from '../components/LinkFormatter.vue'
import MenuParent from '../blocks/MenuParent.vue'
export default {
  name: 'HeaderMenu',
  components: {
    LinkFormatter,
    MenuParent,
  },
  props: {
    menuItems: {
      type: Array,
      default: () => [],
    },
    settings: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      navItems: this.menuItems.slice(),
      subNavItems: [],
      navIndex: null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.controlNav()
      window.addEventListener('resize', this.controlNav)
    })
  },

  destroyed() {
    window.removeEventListener('resize', this.controlNav)
  },

  methods: {
    controlNav() {
      const el = document.getElementById('AccessibleNav')
      const elNavList = document.querySelectorAll('#AccessibleNav > li')
      if (!el || !elNavList) {
        return
      }
      // Reset data to default
      this.navItems = this.menuItems.slice()
      this.subNavItems = []
      this.navIndex = null

      const navWidth = el.parentElement.clientWidth
      let navItemWidth = 0
      elNavList.forEach((el, index) => {
        navItemWidth += Math.ceil(el.offsetWidth)
        if (!this.navIndex && navItemWidth > navWidth) {
          this.navIndex = index
          this.navItems = this.menuItems.slice(0, index)
          this.subNavItems = this.menuItems.slice(index, this.menuItems.length)
        }
      })
      this.navIndex = 0
    },
  },
}
</script>
