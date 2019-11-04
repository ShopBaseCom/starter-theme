<template>
  <div class="breadcrumb_text">
    <span
      v-for="link in routeLinks"
      :key="link.route_link"
      class="breadcrumb_link"
    >
      <router-link :to="$routeToPath(link.route_link)">
        {{ link.name | htmlDecode }}
      </router-link>
      /
    </span>
    <span class="breadcrumb_link breadcrumb_link--current">
      {{ current | htmlDecode }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    routes: {
      type: Array,
      required: true,
    },
    current: {
      type: String,
      default: '',
    },
  },
  computed: {
    routeLinks() {
      return this.routes.filter((route) => route.name)
    },
  },
}
</script>
