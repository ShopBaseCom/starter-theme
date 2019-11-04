<template>
  <ul class="site-nav__dropdown site-nav--has-grandchildren m0 px0 py10">
    <li
      v-for="childItem in childItems"
      :key="childItem.id"
      :class="[
        `site-nav__item m0`,
        {
          'site-nav--has-dropdown site-nav--has-dropdown-grandchild':
            childItem.items && childItem.items.length,
        },
      ]"
    >
      <LinkFormatter :link="childItem" class="site-nav__dropdown-link">
        {{ childItem.name }}
        <span
          v-if="childItem.items && childItem.items.length"
          class="site-nav__icon"
          aria-hidden="true"
        ></span>
      </LinkFormatter>
      <ul
        v-if="childItem.items && childItem.items.length"
        class="site-nav__dropdown-grandchild site-nav--has-great-grandchild m0 px0 py10"
      >
        <li
          v-for="grandchildItem in childItem.items"
          :key="grandchildItem.id"
          :class="[
            `site-nav__item m0`,
            {
              'site-nav--has-dropdown site-nav--has-dropdown-great-grandchild':
                grandchildItem.items && grandchildItem.items.length,
            },
          ]"
        >
          <LinkFormatter :link="grandchildItem" class="site-nav__dropdown-link">
            {{ grandchildItem.name }}
            <span
              v-if="grandchildItem.items && grandchildItem.items.length"
              class="site-nav__icon"
              aria-hidden="true"
            ></span>
          </LinkFormatter>
          <ul
            v-if="grandchildItem.items && grandchildItem.items.length > 0"
            class="site-nav__dropdown-great-grandchild m0 px0 py10"
          >
            <li
              v-for="greatGrandchildren in grandchildItem.items"
              :key="greatGrandchildren.id"
            >
              <LinkFormatter
                :link="greatGrandchildren"
                class="site-nav__dropdown-link"
              >
                {{ greatGrandchildren.name }}
              </LinkFormatter>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import LinkFormatter from '../components/LinkFormatter.vue'
export default {
  name: 'MenuParent',
  components: {
    LinkFormatter,
  },
  props: {
    childItems: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
