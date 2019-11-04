<template>
  <div id="customers-register">
    <div class="container register mb96">
      <div class="row mt40">
        <div class="col-12 breadcrumb-register text-align-center mb12">
          <Breadcrumbs :routes="routes" current="Sign up"></Breadcrumbs>
        </div>
        <div class="col-12 text-align-center">
          <h1 class="h3">{{ $t('Sign up') }}</h1>
        </div>
      </div>

      <div class="row mt32 flow-column items-center">
        <div class="col-12 col-sm-4 mb12">
          <BaseInput
            type="text"
            name="fist-name"
            autocomplete="given-name"
            :value="firstName"
            :placeholder="$t('First name')"
            :validations="[
              {
                condition:
                  !validation.firstName.required && validation.firstName.$error,
                text: $t('Field is required.'),
              },
              {
                condition: !validation.firstName.minLength,
                text: $t('Name must have at least 2 letters.'),
              },
            ]"
            @input="onChangeFirstName"
          />
        </div>
        <div class="col-12 col-sm-4 mb12">
          <BaseInput
            type="text"
            name="last-name"
            autocomplete="last-name"
            :value="lastName"
            :placeholder="$t('Last name')"
            :validations="[
              {
                condition:
                  !validation.lastName.required && validation.lastName.$error,
                text: $t('Field is required.'),
              },
            ]"
            @input="onChangeLastName"
          />
        </div>
        <div class="col-12 col-sm-4 mb12">
          <BaseInput
            type="email"
            name="email"
            autocomplete="email"
            :value="email"
            :placeholder="$t('E-mail address')"
            :validations="[
              {
                condition:
                  !validation.email.required && validation.email.$error,
                text: $t('Field is required.'),
              },
              {
                condition: !validation.email.email && validation.email.$error,
                text: $t('Please provide valid e-mail address.'),
              },
            ]"
            @input="onChangeEmail"
          />
        </div>
        <div class="col-12 col-sm-4 mb12">
          <BaseInput
            ref="password"
            type="password"
            name="password"
            autocomplete="new-password"
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
        <div class="col-12 col-sm-4">
          <BaseInput
            type="password"
            name="password-confirm"
            autocomplete="new-password"
            :value="rPassword"
            :placeholder="$t('Repeat password')"
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
        <div class="col-12 col-sm-4 mt32 mb12">
          <a
            href="#"
            :class="[`btn btn-primary fullwidth`, { 'is-loading': isRegister }]"
            @click.prevent="onRegister"
          >
            {{ $t('Sign up') }}
          </a>
        </div>
        <div class="col-12 col-sm-4 text-align-center">
          <p>
            {{ $t('Already have an account?') }}
            <router-link :to="$routeToPath('/login')">
              {{ $t('Sign in') }}
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumbs from '../components/Breadcrumbs'
import BaseInput from '../components/BaseInput'
export default {
  name: 'Register',
  components: {
    Breadcrumbs,
    BaseInput,
  },
  props: {
    email: {
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
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    isRegister: {
      type: Boolean,
      default: false,
    },
    validation: {
      type: Object,
      default: () => {},
    },
    onRegister: {
      type: Function,
      default: () => {},
    },
    onChangeFirstName: {
      type: Function,
      default: () => {},
    },
    onChangeLastName: {
      type: Function,
      default: () => {},
    },
    onChangeEmail: {
      type: Function,
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
    onChangeConditions: {
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
