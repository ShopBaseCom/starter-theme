<template>
  <section class="section collection-list text-align-center">
    <div class="container">
      <h2 v-if="settings.heading" class="h3 mb40">
        {{ settings.heading }}
      </h2>
      <div v-if="collections.length > 0" class="row">
        <router-link
          v-for="(collection, index) in collections"
          :key="`${collection.id}-${index}`"
          ref="collection"
          class="col-6 col-md-4 collection-wrap link-initial"
          :to="$routeToCollection(collection)"
        >
          <div class="img-wrap">
            <web-image
              :src="settings.blocks[index].image || collection.image"
              :alt="settings.blocks[index].alt_text"
              width="360"
              height="0"
            />
          </div>
          <p class="collection-name is-uppercase mt8">
            {{ collection.title }}
          </p>
        </router-link>
      </div>
      <div v-else class="row">
        <a
          v-for="(image, index) in defaultImages"
          :key="index"
          class="col-6 col-md-4 collection-wrap link-initial"
          target="_blank"
          :href="$themeEditorUrl"
        >
          <div class="img-wrap">
            <img v-lazy="image" alt />
          </div>
          <p class="collection-name is-uppercase mt8">
            {{ $t('Example collection title') }}
          </p>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import getDefaultImages from '../../utils/defaultImages'
export default {
  name: 'FeatureCollections',
  props: {
    collections: {
      type: Array,
      default: () => [],
    },
    settings: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    defaultImages() {
      return getDefaultImages('collectionList')
    },
  },
}
</script>
