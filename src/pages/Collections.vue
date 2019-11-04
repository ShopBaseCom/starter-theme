<template>
  <div id="list-collections">
    <div class="container collection">
      <div
        class="text-align-center text-align-left-md mt40 collection__breadcrumb"
      >
        <Breadcrumbs
          :routes="routes"
          :current="$t('Product collections')"
        ></Breadcrumbs>
      </div>
      <h1
        class="h3 collection__heading text-align-center text-align-left-md mt12 mb32"
      >
        {{ $t('COLLECTION LIST') }}
      </h1>
      <div class="row">
        <div
          v-for="(collection, index) in collectionList"
          :key="index"
          class="col-6 col-md-4 mb32"
        >
          <div class="collection-product-wrap text-align-center">
            <router-link
              v-if="!isEmpty(collection)"
              class=":hover-no-underline d-block"
              :to="$routeToCollection(collection)"
            >
              <div class="collection-image-container image-wrap mb16">
                <web-image
                  :src="collection.image"
                  width="360"
                  height="0"
                  class="has-ratio product-image__content"
                  :alt="collection.title | htmlDecode"
                ></web-image>
              </div>

              <h5
                class="is-uppercase display-8 has-text-weight-medium mb0 title"
              >
                {{ collection.title | htmlDecode }}
              </h5>
            </router-link>

            <a
              v-else
              :href="$createCollectionUrl"
              target="_blank"
              class=":hover-no-underline"
            >
              <div class="collection-image-container image-wrap mb16">
                <img v-lazy="collection.image" alt="" />
              </div>

              <h5
                class="has-text-gray-nero is-uppercase display-8 has-text-weight-medium mb0 collection__product-link"
              >
                {{ $t('Example collection title') }}
              </h5>
            </a>
          </div>
        </div>

        <div class="collection-end"></div>
      </div>
      <LoadingSpinner v-if="isPageFetching" class="mb16"></LoadingSpinner>
    </div>
  </div>
</template>

<script>
import InfiniteScroll from '../mixins/InfiniteScroll'
import getDefaultImages from '../utils/defaultImages'
import Breadcrumbs from '../components/Breadcrumbs'
import LoadingSpinner from '../components/LoadingSpinner'
export default {
  name: 'Collections',
  components: {
    Breadcrumbs,
    LoadingSpinner,
  },
  mixins: [InfiniteScroll],
  props: {
    isPageFetching: {
      type: Boolean,
      default: false,
    },
    collections: {
      type: Array,
      default: () => [],
    },
    pagination: {
      type: Object,
      default: () => ({
        perPage: 16,
        page: 1,
        onPageChange: () => {},
        total: 0,
      }),
    },
  },
  computed: {
    defaultImages() {
      return getDefaultImages('collectionList')
    },
    collectionList() {
      if (!this.collections.length) {
        return Object.keys(this.defaultImages).map((key) => {
          return {
            image: this.defaultImages[key],
          }
        })
      }
      return this.collections
    },
    routes() {
      return [{ name: this.$t('Home'), route_link: '/' }]
    },
  },
  methods: {
    isEmpty(collection) {
      return !collection || !collection.id
    },
  },
}
</script>
