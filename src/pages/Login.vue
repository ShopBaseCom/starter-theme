<template>
  <div id="customers-login">
    <div class="container login mb96">
      <div class="row mt40">
        <div class="col-12 breadcrumb-login text-align-center mb12">
          <Breadcrumbs :routes="routes" :current="$t('Sign in')"></Breadcrumbs>
        </div>
        <div class="col-12 text-align-center">
          <h1 class="h3">
            {{ isForgot ? $t('Reset Password') : $t('Sign in') }}
          </h1>
        </div>
      </div>

      <transition name="fade-in-up">
        <div
          v-if="!isForgot"
          class="row mt32 flow-column text-align-center items-center login-form"
        >
          <div class="col-12 col-sm-4 mb12">
            <BaseInput
              type="email"
              name="email"
              :value="email"
              :placeholder="$t('Your email')"
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
              type="password"
              name="password"
              :value="password"
              :placeholder="$t('Your password.')"
              :validations="[
                {
                  condition:
                    !validation.password.required && validation.password.$error,
                  text: $t('Field is required.'),
                },
              ]"
              @input="onChangePassword"
            />
          </div>
          <div class="col-12 col-sm-4 mb32">
            <a href="#" @click.prevent="onChangeForgot(true)">
              Forgot your password?
            </a>
          </div>
          <div class="col-12 col-sm-4 mb12">
            <a
              href="#"
              :class="[
                `btn btn-primary fullwidth`,
                { 'is-loading': isLoadingLogin },
              ]"
              @click.prevent="onLogin"
            >
              Sign in
            </a>
          </div>
          <div class="col-12 col-sm-4">
            <p>
              {{ $t('Don’t have an account?') }}
              <router-link :to="$routeToPath('/register')">
                {{ $t('Sign up') }}
              </router-link>
            </p>
          </div>
        </div>
      </transition>

      <transition name="fade-in-up">
        <div
          v-if="isForgot && !passwordSent"
          class="row mt32 flow-column items-center forgot-form"
        >
          <div class="col-12 col-sm-4 mb12">
            <BaseInput
              class="input-base"
              type="email"
              name="email"
              :value="email"
              :placeholder="$t('Your email')"
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
            <p class="mt12">
              We will send you an email to reset your password.
            </p>
          </div>
          <div class="col-12 col-sm-4 text-align-center">
            <div class="flex items-center">
              <a
                href="#"
                :class="[`btn btn-primary`, { 'is-loading': isLoadingReset }]"
                @click.prevent="onSendEmail"
              >
                {{ $t('Submit') }}
              </a>
              <p class="mb0 ml8">
                or
                <a href="#" @click.prevent="onChangeForgot(false)">
                  {{ $t('Cancel') }}
                </a>
              </p>
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade-in-up">
        <div v-if="passwordSent" class="row mt32 flow-column items-center">
          <div class="col-12 col-sm-4 text-align-center">
            <p class="mb24">
              {{
                $t(
                  "We've sent password reset instructions to your email. Check your inbox and follow the link."
                )
              }}
            </p>
            <a
              href="#"
              class="btn btn-primary fullwidth"
              @click.prevent="backLogin"
            >
              {{ $t('Back to login') }}
            </a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs'
import BaseInput from '../components/BaseInput'
export default {
  name: 'Login',
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
    passwordSent: {
      type: Boolean,
      default: false,
    },
    isLoadingLogin: {
      type: Boolean,
      default: false,
    },
    isLoadingReset: {
      type: Boolean,
      default: false,
    },
    isForgot: {
      type: Boolean,
      default: false,
    },
    validation: {
      type: Object,
      default: () => {},
    },
    onLogin: {
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
    onSendEmail: {
      type: Function,
      default: () => {},
    },
    onChangePasswordSent: {
      type: Function,
      default: () => {},
    },
    onChangeForgot: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    routes() {
      return [{ name: this.$t('Home'), route_link: '/' }]
    },
  },
  methods: {
    backLogin() {
      this.onChangeForgot(false)
      this.onChangePasswordSent()
    },
  },
}
</script>
