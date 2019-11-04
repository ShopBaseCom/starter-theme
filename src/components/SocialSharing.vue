<template>
  <div class="social-sharing scoped">
    <a
      v-if="shareFacebook"
      target="_blank"
      :href="`//www.facebook.com/sharer.php?u=${url}`"
      class="no-underline pointer share-facebook"
      :title="$t('Share on Facebook')"
    >
      <span class="social-icon" aria-hidden="true"></span>
    </a>

    <a
      v-if="shareTwitter"
      target="_blank"
      :href="`//twitter.com/share?text=${product.name}&url=${url}`"
      class="no-underline pointer ml24 share-twitter"
      :title="$t('Share on Twitter')"
    >
      <span class="social-icon" aria-hidden="true"></span>
    </a>

    <a
      v-if="sharePinterest"
      target="_blank"
      :href="
        `//pinterest.com/pin/create/button/?url=${url}&media=${
          product.image
        }&description=${product.name}`
      "
      class="no-underline pointer ml24 share-pinterest"
      :title="$t('Pin on Pinterest')"
    >
      <span class="social-icon" aria-hidden="true"></span>
    </a>
    <a
      v-if="shareEmail"
      :href="`mailto:?body=${url}&subject=${product.name}`"
      class="no-underline pointer ml24 share-email"
      :title="$t('Share via Email')"
    >
      <span class="social-icon" aria-hidden="true"></span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'SocialSharing',
  props: {
    product: {
      type: Object,
      required: false,
      default: null,
    },
    shareFacebook: {
      type: Boolean,
      required: false,
      default: true,
    },
    sharePinterest: {
      type: Boolean,
      required: false,
      default: true,
    },
    shareTwitter: {
      type: Boolean,
      required: false,
      default: true,
    },
    shareEmail: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    url() {
      return typeof window !== 'undefined' ? window.location.href : ''
    },
  },
}
</script>
