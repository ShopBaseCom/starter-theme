<template>
  <div v-show="openSidebar">
    <div class="sidebar-overlay" @click="$emit('close-sidebar')"></div>
    <div class="sidebar-menu-wrap">
      <div class="sidebar-menu">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0"
        />
        <div class="row sidebar-header">
          <div class="btn-close-wrap">
            <button
              type="button"
              aria-label="close-button"
              class="btn-close"
              @click="$emit('close-sidebar')"
            >
              <span
                ><img src="../assets/images/icons/close.svg" alt="" width="24"
              /></span>
            </button>
          </div>
        </div>

        <div v-if="headerSettings.enable_search" class="search-wrap">
          <div class="sidebar-menu__search mb30">
            <div class="flex sidebar-menu__search-group">
              <input
                id="search"
                v-model="keyword"
                class="search-panel-input w-100"
                placeholder="Enter keywords..."
                name="q"
                type="text"
                autocomplete="off"
                @keyup.enter="actionSearch"
              />
              <span class="search-icon" @click.prevent="actionSearch"></span>
            </div>
          </div>
        </div>
        <div class="cat-title-wrap">
          <ul class="mobile-nav p0 m0">
            <li
              v-for="(item, index) in catList"
              :key="item.id"
              class="mobile-nav__item"
            >
              <div
                :class="[
                  `mobile-nav__has-sublist`,
                  { 'mobile-nav--expanded': actives.lv1 === index },
                ]"
              >
                <LinkFormatter
                  :link="item"
                  class="mobile-nav__link"
                  @click.native="$emit('close-sidebar')"
                >
                  {{ item.name }}
                </LinkFormatter>
                <div
                  v-if="item.items && item.items.length > 0"
                  class="mobile-nav__toggle"
                >
                  <button
                    type="button"
                    class="mobile-nav__toggle-btn icon-fallback-text"
                    @click.prevent="setActive('lv1', index)"
                  >
                    <span class="icon-fallback-text mobile-nav__toggle-open">
                      <svg>
                        <use xlink:href="#ic_add_24px"></use>
                      </svg>
                    </span>
                    <span class="icon-fallback-text mobile-nav__toggle-close">
                      <svg>
                        <use xlink:href="#ic_remove_24px"></use>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              <SCollapseTransition>
                <ul
                  v-show="actives.lv1 === index"
                  v-if="item.items && item.items.length > 0"
                  class="mobile-nav__sublist p0 m0"
                >
                  <li
                    v-for="(childItem, childIndex) in item.items"
                    :key="childItem.id"
                    class="mobile-nav__item"
                  >
                    <div
                      :class="[
                        `mobile-nav__has-sublist`,
                        { 'mobile-nav--expanded': actives.lv2 === childIndex },
                      ]"
                    >
                      <LinkFormatter
                        :link="childItem"
                        class="mobile-nav__link"
                        @click.native="$emit('close-sidebar')"
                      >
                        {{ childItem.name }}
                      </LinkFormatter>
                      <div
                        v-if="childItem.items && childItem.items.length > 0"
                        class="mobile-nav__toggle"
                      >
                        <button
                          type="button"
                          class="mobile-nav__toggle-btn icon-fallback-text"
                          @click.prevent="setActive('lv2', childIndex)"
                        >
                          <span
                            class="icon-fallback-text mobile-nav__toggle-open"
                          >
                            <svg>
                              <use xlink:href="#ic_add_24px"></use>
                            </svg>
                          </span>
                          <span
                            class="icon-fallback-text mobile-nav__toggle-close"
                          >
                            <svg>
                              <use xlink:href="#ic_remove_24px"></use>
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                    <SCollapseTransition>
                      <ul
                        v-show="actives.lv2 === childIndex"
                        v-if="childItem.items && childItem.items.length > 0"
                        class="mobile-nav__sublist mobile-nav__subsublist p0 m0"
                      >
                        <li
                          v-for="grandchildItem in childItem.items"
                          :key="grandchildItem.id"
                          class="mobile-nav__item"
                        >
                          <LinkFormatter
                            :link="grandchildItem"
                            class="mobile-nav__link"
                            @click.native="$emit('close-sidebar')"
                          >
                            {{ grandchildItem.name }}
                          </LinkFormatter>
                        </li>
                      </ul>
                    </SCollapseTransition>
                  </li>
                </ul>
              </SCollapseTransition>
            </li>
          </ul>
        </div>

        <div v-if="topBarVisible" class="social-contact w-100">
          <div class="social-wrap">
            <a
              v-if="accountIconVisible !== 'disabled'"
              href="#"
              class="login-wrap flex justify-center items-center px12"
              @click.prevent="
                $navigateToAccount()
                $emit('close-sidebar')
              "
            >
              <span class="social-icon login"></span>
              <span class="ml8">
                {{ currentUser ? 'My Account' : 'Sign up/Sign in' }}
              </span>
            </a>
            <div v-if="isEnabledCurrencies" class="currency-converter-mobile">
              <no-ssr>
                <svg :class="`currency-icon currency-${$currency.code}`">
                  <use :xlink:href="`#${$currency.code}`"></use>
                </svg>
              </no-ssr>
              <select :value="$currency.code" @change="onSelectCurrency">
                <option
                  v-for="(currency, index) in $shop.enabled_currencies"
                  :key="index"
                  :value="currency.code"
                >
                  {{ currency.code }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SCollapseTransition from '../utils/collapse'
import LinkFormatter from '../components/LinkFormatter.vue'
import { getCoreMixin } from '../shared/mixin'

export default {
  components: {
    SCollapseTransition,
    LinkFormatter,
  },
  mixins: [getCoreMixin('headerMixin')],
  props: {
    openSidebar: {
      type: Boolean,
      default: false,
    },
    catList: {
      type: Array,
      default: () => [],
    },
    headerSettings: {
      type: Object,
      default: () => {},
    },
    accountIconVisible: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      actives: {
        lv1: -1,
        lv2: -1,
      },
      current: 0,
      keyword: '',
    }
  },
  computed: {
    topBarVisible() {
      return this.accountIconVisible !== 'disabled' || this.isEnabledCurrencies
    },
    isEnabledCurrencies() {
      return (
        this.$shop.enabled_currencies &&
        this.$shop.enabled_currencies.length > 0
      )
    },
  },
  methods: {
    actionSearch() {
      this.$emit('close-sidebar')
      this.$router.push(this.routeToPath(`/search?q=${this.keyword}`))
    },
    setActive(lv, index) {
      this.$set(this.actives, lv, this.actives[lv] === index ? -1 : index)
    },
    onSelectCurrency(e) {
      this.$changeCurrency(e.target.value)
    },
  },
}
</script>
