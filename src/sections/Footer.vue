<template>
  <div id="roller-section-footer" class="roller-section footer-section">
    <footer
      class="site-footer brdr-top-1 brdr-cl-whisper pt40"
      role="contentinfo"
    >
      <div class="container">
        <div class="row">
          <div
            v-for="(block, index) in blocks"
            :key="index"
            :class="`col-sm-${12 / (blocks.length || 1)}`"
          >
            <div
              :class="[
                `mb32 ${
                  block.element_type === 'menu'
                    ? 'footer_menu'
                    : 'footer_content'
                }`,
              ]"
            >
              <h6
                class="h5 has-text-weight-medium is-uppercase has-text-gray-nero site-footer__header flex items-center"
                @click.prevent="actives[index] = !actives[index]"
              >
                <span v-if="block.element_type !== 'page'" class="flex-grow">
                  {{
                    block.element_type === 'menu'
                      ? $getMenu(block.main_menu).title
                      : block.heading
                  }}
                </span>
                <span v-else class="flex-grow">
                  {{ page.title }}
                </span>
                <span
                  class="flex-basis icon-down-arrow"
                  :class="{ 'is-active': actives[index] }"
                ></span>
              </h6>
              <SCollapseTransition>
                <div v-show="actives[index]" class="toggle_content">
                  <ul
                    v-if="
                      block.element_type === 'menu' && $getMenu(block.main_menu)
                    "
                    class="list-style-none p0"
                  >
                    <li
                      v-for="item in $getMenu(block.main_menu).items"
                      :key="item.id"
                      class="footer_link my6"
                    >
                      <LinkFormatter :link="item">
                        {{ item.name }}
                      </LinkFormatter>
                    </li>
                  </ul>
                  <div
                    v-else-if="block.element_type === 'title'"
                    class="mb16"
                    v-html="block.text"
                  ></div>
                  <div v-else v-html="page.body_html"></div>
                </div>
              </SCollapseTransition>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="flex flex-wrap align-center pt40 footer-before">
              <div
                v-if="sectionSettings.show_social_media_icons"
                class="footer-social mb24"
              >
                <ul class="list-style-none m0 p0 flex">
                  <li v-if="sectionSettings.facebook_link" class="mr24">
                    <a
                      class="footer-social__icon footer-social__icon--fb"
                      :href="sectionSettings.facebook_link"
                      target="_blank"
                      title="Facebook"
                    ></a>
                  </li>
                  <li v-if="sectionSettings.twitter_link" class="mr24">
                    <a
                      class="footer-social__icon footer-social__icon--tw"
                      :href="sectionSettings.twitter_link"
                      target="_blank"
                      title="Twitter"
                    ></a>
                  </li>
                  <li v-if="sectionSettings.pinterest_link" class="mr24">
                    <a
                      class="footer-social__icon footer-social__icon--pin"
                      :href="sectionSettings.pinterest_link"
                      target="_blank"
                      title="Pinterest"
                    ></a>
                  </li>
                  <li v-if="sectionSettings.youtube_link" class="mr24">
                    <a
                      class="footer-social__icon footer-social__icon--you"
                      :href="sectionSettings.youtube_link"
                      target="_blank"
                      title="Youtube"
                    ></a>
                  </li>
                  <li v-if="sectionSettings.instagram_link" class="mr24">
                    <a
                      class="footer-social__icon footer-social__icon--ins"
                      :href="sectionSettings.instagram_link"
                      target="_blank"
                      title="Instagram"
                    ></a>
                  </li>
                  <li v-if="sectionSettings.blog_link">
                    <a
                      class="footer-social__icon footer-social__icon--blog"
                      :href="sectionSettings.blog_link"
                      target="_blank"
                      title="Blog"
                    ></a>
                  </li>
                </ul>
              </div>
              <div class="footer-copyright mb24 text-align-right-sm">
                <p class="display-7 is-uppercase m0">
                  © 2019 {{ $shop.name }}.
                  {{ sectionSettings.copyright_text }}
                </p>
              </div>
            </div>
            <div class="flex flex-wrap align-center mb40 footer-after">
              <div class="footer-powered-by mb24">
                <a
                  v-if="sectionSettings.show_powered_by !== false"
                  class="powered-by"
                  :href="poweredByLink"
                  target="_blank"
                ></a>
              </div>
              <div class="footer-credits mb24">
                <ul
                  v-if="sectionSettings.show_payment_method_icons"
                  class="list-style-none m0 p0 flex"
                >
                  <li
                    v-for="(payment, index) in paymentMethods"
                    :key="index"
                    :class="[
                      `footer-credits__icon footer-credits__icon--${payment}`,
                      { ml16: index !== 0 },
                    ]"
                  ></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { getCoreMixin } from '../shared/mixin'
import SCollapseTransition from '../utils/collapse'
import { FOOTER } from '../constants'
import LinkFormatter from '../components/LinkFormatter'
export default {
  name: 'Footer',
  components: { SCollapseTransition, LinkFormatter },
  mixins: [getCoreMixin('footerMixin')],
  data() {
    return {
      actives: {
        0: false,
        1: true,
        2: false,
        3: false,
      },
      paymentMethods: ['visa', 'master', 'amex', 'paypal'],
    }
  },
  computed: {
    sectionSettings() {
      return Object.assign({}, FOOTER, this.$getFixedSettings('footer'))
    },
    blocks() {
      if (this.sectionSettings && this.sectionSettings.blocks) {
        return this.sectionSettings.blocks.filter(
          (block) =>
            (block.main_menu && block.main_menu !== 'none') ||
            block.text ||
            block.page
        )
      }

      return []
    },
    poweredByLink() {
      return `https://shopbase.com?utm_source=pm&utm_medium=poweredby&utm_name=storefooter&shopname=${
        this.$shop.name
      }`
    },
  },
}
</script>
