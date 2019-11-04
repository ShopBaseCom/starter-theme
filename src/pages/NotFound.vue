<template>
  <div id="not_found">
    <div class="container mt128 mb128">
      <div class="row">
        <div class="col-12 text-align-center">
          <h2 class="mb16 display-3 mt0">
            {{ $t('404 Page Not Found') }}
          </h2>
          <p class="mb30 mt0">
            {{ $t('The page you requested does not exist') }}
          </p>
          <router-link class="btn btn-primary" :to="$routeToHome()">
            {{ $t('Continue shopping') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>
