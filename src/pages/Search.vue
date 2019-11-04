<template>
  <div id="search">
    <div class="container search mb96">
      <div class="row mt40">
        <div class="col-12 breadcrumb-search text-align-center-xs mb12">
          <Breadcrumbs :routes="routes" :current="$t('Search')"></Breadcrumbs>
        </div>
        <div class="col-12 text-align-center-xs mb24">
          <h1 class="h3">{{ $t('SEARCH') }}</h1>
        </div>
        <div
          class="col-12 flex flex-wrap items-stretch relative w-100 search-bar"
        >
          <input
            v-model="keyword"
            type="text"
            name="q"
            :placeholder="$t('Enter keywords...')"
            :aria-label="$t('Enter keywords...')"
            @keyup.enter="onSearchChange(keyword)"
          />
          <span class="flex input-group-btn brdr-1 brdr-cl-whisper ml-1">
            <button
              type="button"
              class="icon-fallback-text"
              @click.prevent="onSearchChange(keyword)"
            >
              <span class="icon-search" aria-hidden="true"></span>
              <span class="fallback-text">{{ $t('Search') }}</span>
            </button>
          </span>
        </div>
      </div>

      <div v-if="!$searchSettings.enable" class="row mt32">
        <div class="col-12">
          <p class="m0">
            {{
              $t('Sorry, but you do not have permission to search on our shop.')
            }}
          </p>
        </div>
      </div>

      <no-ssr>
        <div v-if="searching" class="row mt32">
          <div class="col-12">
            <p class="searching">
              {{ $t('Looking for') }} "{{ keyword }}"
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </p>
          </div>
        </div>
      </no-ssr>

      <div v-if="isEmptyResult && products.length === 0" class="row mt32">
        <div class="col-12">
          <p>
            {{ $t(`Your search for "${keyword}" did not yield any results.`) }}
          </p>
        </div>
      </div>

      <ProductGrid
        v-else
        :products="products"
        :theme-settings="productSettings"
      >
      </ProductGrid>

      <div v-if="totalProduct > products.length" class="row mt32">
        <div class="col-12 text-align-center">
          <a href="#" class="btn btn-outline-gray" @click.prevent="onLoadMore">
            {{ $t('Load more') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs'
import ProductGrid from '../blocks/Product/ProductGrid'
export default {
  name: 'Search',
  components: {
    Breadcrumbs,
    ProductGrid,
  },
  props: {
    search: {
      type: String,
      default: '',
    },
    searching: {
      type: Boolean,
      default: false,
    },
    products: {
      type: Array,
      default: () => [],
    },
    isEmptyResult: {
      type: Boolean,
      default: false,
    },
    totalProduct: {
      type: Number,
      required: false,
      default: 0,
    },
    onLoadMore: {
      type: Function,
      default: () => {},
    },
    onSearchChange: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      keyword: this.search || '',
    }
  },
  computed: {
    routes() {
      return [{ name: this.$t('Home'), route_link: '/' }]
    },
    productSettings() {
      return this.$getThemeSettings('product_grid')
    },
  },
  watch: {
    search(val) {
      this.keyword = val
    },
  },
}
</script>
