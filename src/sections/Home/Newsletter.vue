<template>
  <section class="section subscribe special-block">
    <div class="container-fluid text-align-center">
      <div class="subscribe-wrap">
        <h2 class="h3 mb8">{{ settings.heading }}</h2>
        <no-ssr>
          <div class="announce-text mb24" v-html="settings.subheading"></div>
        </no-ssr>
        <div class="form-wrapper">
          <form
            v-if="!isSubscribed"
            novalidate
            class="form-wrapper flex items-center justify-center"
            @submit.prevent="handleSubscribe"
          >
            <input
              v-model="email"
              type="text"
              name="email"
              placeholder="Enter Your Email Address"
              :class="{ 'brdr-cl-red': $v.email.$error }"
            />
            <button
              type="submit"
              :class="[
                'link-initial btn btn-primary',
                { 'is-loading': isSubscribing },
              ]"
              @click="handleSubscribe"
            >
              {{ $t('Sign up') }}
            </button>
          </form>
          <div v-else class="h4 cl-green">
            {{ $t('Thank you for subscribing') }}
          </div>
          <div
            v-for="(validation, index) in validations"
            :key="index"
            class="validation-wrapper mt8 text-align-left"
          >
            <p
              v-if="validation.condition"
              class="message message--invalid cl-red"
            >
              {{ validation.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getCoreMixin } from '../../shared/mixin'
export default {
  name: 'Newsletter',
  mixins: [getCoreMixin('newsletterMixin')],
  props: {
    settings: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleSubscribe() {
      const result = this.onSubscribe()

      if (result) {
        this.showSuccessfulSubmission()
      }
    },
  },
}
</script>
