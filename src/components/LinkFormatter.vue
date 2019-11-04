<template>
  <a
    v-if="isHttpType(link) && !isRelativeLink(link)"
    :href="getAbsoluteLink(link.type_options.subject)"
  >
    <slot />
  </a>
  <router-link
    v-else-if="isHttpType(link) && isRelativeLink(link)"
    :to="$routeToPath(`${link.type_options.subject}`)"
  >
    <slot />
  </router-link>
  <router-link v-else :to="getMenuLink(link)">
    <slot />
  </router-link>
</template>

<script>
import { getCoreMixin } from '../shared/mixin'
export default {
  name: 'LinkFormatter',
  mixins: [getCoreMixin('linkMixin')],
  props: {
    link: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
