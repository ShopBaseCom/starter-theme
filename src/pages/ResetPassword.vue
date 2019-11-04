<template>
  <div id="customers-reset-pass">
    <div class="container reset-password mb96">
      <div class="row mt40">
        <div class="col-12 breadcrumb-reset-password text-align-center mb12">
          <Breadcrumbs
            :routes="routes"
            :current="$t('Reset password')"
          ></Breadcrumbs>
        </div>
        <div class="col-12 text-align-center">
          <h1 class="h3">
            {{ $t('Reset your password') }}
          </h1>
        </div>
      </div>

      <div class="row mt32 flow-column items-center">
        <p class="col-12 col-sm-4 mb12">
          {{ subtitle }}
        </p>
        <div class="col-12 col-sm-4 mb12">
          <BaseInput
            type="password"
            name="password"
            :value="password"
            :placeholder="$t('Password')"
            :validations="[
              {
                condition:
                  !validation.password.required && validation.password.$error,
                text: $t('Field is required.'),
              },
              {
                condition:
                  !validation.password.minLength && validation.password.$error,
                text: $t('Password must have at least 8 letters.'),
              },
            ]"
            @input="onChangePassword"
          />
        </div>
        <div class="col-12 col-sm-4 mb12">
          <BaseInput
            type="password"
            name="password"
            :value="rPassword"
            :placeholder="$t('Confirm password')"
            :validations="[
              {
                condition:
                  !validation.rPassword.required && validation.rPassword.$error,
                text: $t('Field is required.'),
              },
              {
                condition:
                  !validation.rPassword.sameAsPassword &&
                  validation.rPassword.$error,
                text: $t('Passwords must be identical.'),
              },
            ]"
            @input="onChangeRPassword"
          />
        </div>
        <div class="col-12 col-sm-4 mb12">
          <a
            href="#"
            :class="[
              `btn btn-primary fullwidth`,
              { 'is-loading': isLoadingReset },
            ]"
            @click.prevent="onResetPassword"
          >
            {{ $t('Reset password') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs'
import BaseInput from '../components/BaseInput'
export default {
  name: 'ResetPassword',
  components: {
    Breadcrumbs,
    BaseInput,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    subtitle: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    rPassword: {
      type: String,
      default: '',
    },
    isLoadingReset: {
      type: Boolean,
      default: false,
    },
    validation: {
      type: Object,
      default: () => {},
    },
    onChangePassword: {
      type: Function,
      default: () => {},
    },
    onChangeRPassword: {
      type: Function,
      default: () => {},
    },
    onResetPassword: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    routes() {
      return [{ name: this.$t('Home'), route_link: '/' }]
    },
  },
}
</script>
