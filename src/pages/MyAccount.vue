<template>
  <div class="my_account">
    <section class="scoped my24">
      <div class="row">
        <div class="col-12">
          <div class="text-wrapper">
            <h3 class="text-align-center">{{ $t('My Account') }}</h3>
            <ul class="flex align-center justify-center m0 p0 list-style-none">
              <li v-for="(page, index) in navigation" :key="index" class="mx10">
                <router-link
                  class="no-underline d-block decoration-underline :hover-no-underline"
                  :to="$routeToPath(page.link)"
                >
                  {{ page.title }}
                </router-link>
              </li>
              <li class="mx10">
                <a
                  href="#"
                  class="no-underline d-block decoration-underline :hover-no-underline"
                  @click.prevent="onLogout"
                >
                  {{ $t('Logout') }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <div class="container px16 pt24 section-address">
      <div class="row">
        <div class="col-12">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageMyAccount',
  props: {
    onLogout: {
      type: Function,
      default: () => {},
    },
    navigation: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
