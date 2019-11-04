<template>
  <div id="activate-account">
    <div v-if="isLoading" class="container my100">
      <div class="row">
        <div class="col-12 text-align-center">
          <div class="display-1 py100">
            {{ $t('Activating Account') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActiveAccount',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
