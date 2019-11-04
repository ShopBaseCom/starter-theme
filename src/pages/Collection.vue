<template>
  <div id="collection">
    <div class="container collection-detail mb96">
      <div class="row mt40">
        <div class="col-12 breadcrumb-collection text-align-center-xs mb12">
          <Breadcrumbs
            :routes="breadcrumbs.routes"
            :current="breadcrumbs.current"
          ></Breadcrumbs>
        </div>
        <div class="col-12 text-align-center-xs mb24">
          <h1 class="h3">
            {{ collection.title || $t('Products') }}
          </h1>
          <no-ssr>
            <p
              v-if="collection.description"
              class="heading-content"
              v-html="collection.description"
            ></p>
          </no-ssr>
        </div>
        <div class="col-12 sort_by">
          <BaseSelect
            v-if="false"
            :selected="sortBy"
            :options="sortOptions"
            @input="onSortChange"
          />
          <BaseSelect
            v-if="false"
            :selected="filterBy"
            :options="filterOptions"
            @input="onFilterChange"
          />
        </div>
      </div>

      <ProductGrid
        v-if="products.length"
        :collection="collection"
        :products="products"
        :theme-settings="productSettings"
        :judge-me="true"
        :turn-off-lazy-load="true"
      >
      </ProductGrid>
      <PlaceholderProductGrid
        v-else
        :category="collection"
        :theme-settings="productSettings"
      ></PlaceholderProductGrid>
      <LoadingSpinner v-if="isLoading"></LoadingSpinner>
      <div class="flex justify-center">
        <button
          v-if="isVisibleLoadMoreButton"
          class="load-more btn btn-outline"
          @click="onLoadMoreProducts"
        >
          {{ $t('Load more') }}
        </button>
      </div>

      <div class="collection-end"></div>
    </div>
  </div>
</template>

<script>
import InfiniteScroll from '../mixins/InfiniteScroll'
import Breadcrumbs from '../components/Breadcrumbs'
import BaseSelect from '../components/BaseSelect.vue'
import LoadingSpinner from '../components/LoadingSpinner'
import ProductGrid from '../blocks/Product/ProductGrid'
import PlaceholderProductGrid from '../blocks/Product/PlaceholderProductGrid'
export default {
  name: 'Collection',
  components: {
    Breadcrumbs,
    BaseSelect,
    LoadingSpinner,
    ProductGrid,
    PlaceholderProductGrid,
  },
  mixins: [InfiniteScroll],
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isVisibleLoadMoreButton: {
      type: Boolean,
      default: false,
    },
    breadcrumbs: {
      type: Object,
      default: () => {},
    },
    collection: {
      type: Object,
      default: () => {},
    },
    products: {
      type: Array,
      default: () => [],
    },
    filterBy: {
      type: String,
      default: '',
    },
    filterOptions: {
      type: Array,
      default: () => [],
    },
    onFilterChange: {
      type: Function,
      default: () => {},
    },
    sortBy: {
      type: String,
      default: '',
    },
    sortOptions: {
      type: Array,
      default: () => [],
    },
    onSortChange: {
      type: Function,
      default: () => {},
    },
    pagination: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    productSettings() {
      return this.$getThemeSettings('product_grid')
    },
  },
  methods: {
    onLoadMoreProducts() {
      this.pagination.onPageChange(this.pagination.page, false)
    },
  },
}
</script>
