<template>
  <div id="contact-us-page" class="contact-us-page">
    <div v-if="page.title" class="container pt40">
      <div class="text-align-center text-align-left-md cart__breadcrumbs">
        <Breadcrumbs :routes="routes" :current="page.title"></Breadcrumbs>
      </div>
      <section class="mt16 mb5">
        <div class="row">
          <div class="col-12">
            <div class="text-wrapper">
              <h3
                class="text-align-center text-align-left-md cart__breadcrumbs"
              >
                {{ page.title }}
              </h3>
            </div>
          </div>
        </div>
      </section>
      <div class="row mb55">
        <div class="col-12 page-content">
          <div class="mb24" v-html="bodyHtml"></div>
          <transition name="fade-in-up">
            <div
              v-if="submitted || hasError"
              :class="[
                'py12 px10 mb16 brdr-1 brdr-cl-white',
                { 'page-content__alert-success': submitted },
                { 'page-content__alert-error': hasError },
              ]"
            >
              {{
                contactPosted
                  ? $t(
                      "Thanks for contacting us. We'll get back to you as soon as possible."
                    )
                  : $t('Error while sending contact us.')
              }}
            </div>
          </transition>
          <form
            id="contact_form"
            accept-charset="UTF-8"
            class="row contact-form"
            @submit.prevent="submitContact"
          >
            <div class="col-12 col-sm-6 mb12 contact-form__name">
              <BaseInput
                v-model="contact.name"
                type="text"
                name="name"
                autocomplete="name"
                :placeholder="$t('Name')"
              />
            </div>
            <div class="col-12 col-sm-6 mb12 contact-form__email">
              <BaseInput
                v-model="contact.email"
                type="email"
                name="email"
                autocomplete="email"
                required
                :placeholder="$t('Email')"
              />
            </div>
            <div class="col-12 col-sm-12 mb12">
              <BaseInput
                v-model="contact.phone"
                type="tel"
                name="phone"
                autocomplete="phone"
                pattern="[0-9\-]*"
                :placeholder="$t('Phone')"
              />
            </div>
            <div class="col-12 col-sm-12 mb12">
              <BaseTextarea
                v-model="contact.message"
                name="message"
                spellcheck="false"
                :placeholder="$t('Message')"
                :rows="10"
              />
            </div>

            <div class="col-12 col-sm-12 mt5 text-align-right">
              <button
                type="submit"
                :class="['btn btn-primary px55', { 'is-loading': isSending }]"
              >
                {{ $t('Send') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCoreMixin } from '../../shared/mixin'
import Breadcrumbs from '../../components/Breadcrumbs'
import BaseInput from '../../components/BaseInput'
import BaseTextarea from '../../components/BaseTextarea'

export default {
  name: 'TemplatePageContactUs',
  components: {
    Breadcrumbs,
    BaseInput,
    BaseTextarea,
  },
  mixins: [getCoreMixin('contactUsMixin')],
  props: {
    page: {
      type: Object,
      default: () => {},
    },
    bodyHtml: {
      type: String,
      default: '',
    },
    routes: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
