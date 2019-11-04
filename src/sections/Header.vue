<template>
  <div>
    <section
      v-if="
        sectionSettings.show_announcement_bar &&
          sectionSettings.announcement_message &&
          sectionSettings.announcement_message !== '<p><br></p>'
      "
      class="announcement-bar"
    >
      <div class="container-fluid">
        <div
          class="annouce-content py12 text-align-center"
          v-html="sectionSettings.announcement_message"
        >
        </div>
      </div>
    </section>
    <section v-if="topBarVisible" class="top-bar">
      <div class="container clearfix">
        <div
          v-if="sectionSettings.show_social_media_icons"
          class="social-icons float-left flex justify-center items-center"
        >
          <a
            v-if="sectionSettings.facebook_link"
            :href="sectionSettings.facebook_link"
            class="mr24 flex items-center"
            target="_blank"
          >
            <span class="social-icon facebook"></span>
          </a>
          <a
            v-if="sectionSettings.twitter_link"
            :href="sectionSettings.twitter_link"
            target="_blank"
            class="mr24 flex items-center"
          >
            <span class="social-icon twitter"></span>
          </a>
          <a
            v-if="sectionSettings.pinterest_link"
            :href="sectionSettings.pinterest_link"
            target="_blank"
            class="mr24 flex items-center"
          >
            <span class="social-icon pinterest"></span>
          </a>
          <a
            v-if="sectionSettings.youtube_link"
            :href="sectionSettings.youtube_link"
            target="_blank"
            class="mr24 flex items-center"
          >
            <span class="social-icon youtube"></span>
          </a>
          <a
            v-if="sectionSettings.instagram_link"
            :href="sectionSettings.instagram_link"
            target="_blank"
            class="mr24 flex items-center"
          >
            <span class="social-icon insta"></span>
          </a>
          <a
            v-if="sectionSettings.blog_link"
            :href="sectionSettings.blog_link"
            target="_blank"
            class="flex items-center"
          >
            <span class="social-icon blog"></span>
          </a>
        </div>
        <div
          class="login-contact-area float-right flex justify-center items-center"
        >
          <p
            v-if="sectionSettings.phone_number"
            class="contact-number mb0 mr16 flex align-center justify-center"
          >
            <a class="top-menu" :href="`tel:+${sectionSettings.phone_number}`">
              {{ sectionSettings.phone_number }}
            </a>
          </p>
          <ul
            v-if="$getMenu(sectionSettings.top_bar_menu)"
            class="flex align-center justify-center list-style-none p0 m0"
          >
            <li
              v-for="item in $getMenu(sectionSettings.top_bar_menu).items"
              :key="item.id"
              class=""
            >
              <LinkFormatter :link="item" class="top-menu mb0 mr16">
                {{ item.name }}
              </LinkFormatter>
            </li>
          </ul>
          <div
            v-if="isEnabledCurrencies"
            class="currency-converter-button"
            @click="toggleCurrencyDropdown()"
          >
            <no-ssr>
              <svg :class="`currency-icon currency-${$currency.code}`">
                <use :xlink:href="`#${$currency.code}`"></use>
              </svg>
            </no-ssr>
            {{ $currency.code }}
          </div>
        </div>
      </div>
      <CurrencyDropdown
        v-if="isEnabledCurrencies"
        :is-show-dropdown.sync="isShowCurrencyDropdown"
        :currency="$currency"
        :currencies="$shop.enabled_currencies"
        :currency-right="currencyRight"
        @change="$changeCurrency"
      />
    </section>
    <section
      class="header responsive"
      :class="{ sticky: isSticky && sectionSettings.fixed_header }"
    >
      <div class="container">
        <div class="row relative">
          <div class="col-8 col-sm-2 logo-col flex items-center justify-center">
            <div class="logo">
              <router-link
                to="/"
                class="logo-text justify-center items-center flex"
              >
                <img
                  v-if="getLogo"
                  class="fit-logo"
                  :src="$resizeImage(getLogo, '0', '180', '')"
                  :alt="$shop.name"
                  :srcset="urlSrcSet(getLogo)"
                  :style="`width: ${sectionSettings.width}px;`"
                />

                <div v-else ref="logo" class="items-center flex m0">
                  {{ $shop.name }}
                </div>
              </router-link>
            </div>
          </div>
          <div
            class="col-2 col-sm-7 flex items-center justify-center menu-content-col"
          >
            <div
              v-if="sectionSettings.main !== 'none'"
              class="menu-content-desk text-align-center flex justify-center items-center w-100"
            >
              <HeaderMenu
                :menu-items="$getMenu(sectionSettings.main).items"
                :settings="sectionSettings"
              />
            </div>
            <div class="menu-content-mobile">
              <button
                type="button"
                aria-label="open-menu"
                data-testid="menuButton"
                @click="openSidebarMenu"
              >
              </button>
            </div>
          </div>
          <div class="col-2 col-sm-3 flex items-center justify-end cart-col">
            <div v-if="sectionSettings.enable_search" class="search-bar">
              <input
                v-model="keyword"
                name="q"
                type="text"
                placeholder="Search"
                class="pl12"
                @keyup.enter="actionSearch"
              />
              <span
                class="search-icon pointer"
                @click.prevent="actionSearch"
              ></span>
            </div>
            <div
              v-if="sectionSettings.enable_search"
              class="search-icon-mobile items-center"
            >
              <router-link
                class="search-icon"
                :to="$routeToPath('/search')"
              ></router-link>
            </div>
            <div
              v-if="
                $checkoutSetting.form.require_account &&
                  $checkoutSetting.form.require_account !== 'disabled'
              "
              class="flex items-center mx8 hidden-xs nav-customer"
            >
              <a
                class="login-icon"
                href="#"
                @click.prevent="$navigateToAccount"
              ></a>
            </div>
            <div
              v-if="sectionSettings.show_cart"
              :class="[
                'flex items-center ml5 cart-area',
                { 'cart-area-disable': pointerEventsNone },
              ]"
              @mouseover="cartIconHovered = true"
              @mouseleave="cartIconHovered = false"
            >
              <a
                ref="iconCartDrawer"
                href="#"
                :class="[
                  sectionSettings.cart_icon === 'bag'
                    ? 'cart-icon-bag'
                    : 'cart-icon-cart',
                ]"
                @click.prevent="toggleShowCart"
              >
                <no-ssr>
                  <span v-if="parseInt(cartQuantity) > 0" class="cart-number">
                    {{ cartQuantity }}
                  </span>
                </no-ssr>
              </a>
            </div>
          </div>
          <div
            ref="cartDrawer"
            class="cart-drawer-content"
            :class="{ 'cart-drawer-content--active': showCart }"
            @mouseenter="cartDrawerHovered = true"
            @mouseleave="cartDrawerHovered = false"
          >
            <CartDrawer
              @offCartDrawer="offCart"
              @before-redirect="
                showCart = false
                pointerEventsNone = true
              "
            />
          </div>
        </div>
      </div>
    </section>
    <div
      ref="anchor"
      class="anchor"
      :class="{ height: isSticky && sectionSettings.fixed_header }"
    ></div>
    <SideBarMenu
      :open-sidebar="openSidebar"
      :cat-list="$getMenu(sectionSettings.main).items"
      :header-settings="sectionSettings"
      :account-icon-visible="$checkoutSetting.form.require_account"
      @close-sidebar="openSidebar = false"
    ></SideBarMenu>
  </div>
</template>

<script>
import fitty from 'fitty'
import CartDrawer from '../blocks/CartDrawer'
import { getCoreMixin } from '../shared/mixin'
import { HEADER } from '../constants'
import SideBarMenu from '../blocks/SidebarMenu'
import HeaderMenu from '../blocks/HeaderMenu'
import LinkFormatter from '../components/LinkFormatter.vue'
import CurrencyDropdown from '../blocks/CurrencyDropdown.vue'
export default {
  name: 'Header',
  components: {
    CartDrawer,
    SideBarMenu,
    LinkFormatter,
    HeaderMenu,
    CurrencyDropdown,
  },
  mixins: [getCoreMixin('headerMixin'), getCoreMixin('cartDrawerMixin')],
  data() {
    return {
      pointerEventsNone: false,
      showCart: false,
      keyword: '',
      isSticky: false,
      refAnchor: null,
      openSidebar: false,
      $_fitty: undefined,
      cartDrawerHovered: false,
      cartIconHovered: false,
      isClickCartIcon: false,
      currencyButton: null,
      currencyRight: 0,
      isShowCurrencyDropdown: false,
    }
  },
  computed: {
    sectionSettings() {
      return Object.assign({}, HEADER, this.$getFixedSettings('header'))
    },
    cartQuantity() {
      const result = this.productsInCart.reduce((acc, cartItem) => {
        return acc + cartItem.qty
      }, 0)
      if (result < 10) {
        return '0' + result
      } else if (result > 99) {
        return '99+'
      } else {
        return result
      }
    },
    getLogo() {
      if (
        (this.isPreview && this.previewDevice === 'mobile') ||
        (!this.isPreview && this.$isMobile())
      ) {
        return this.sectionSettings.mobile_logo || this.sectionSettings.logo
      }

      return this.sectionSettings.logo || this.sectionSettings.mobile_logo
    },
    topBarVisible() {
      return (
        this.sectionSettings.show_top_bar &&
        (this.socialMediaNotEmpty ||
          this.sectionSettings.top_bar_menu !== 'none' ||
          this.sectionSettings.phone_number ||
          this.isEnabledCurrencies)
      )
    },
    socialMediaNotEmpty() {
      return (
        this.sectionSettings.show_social_media_icons &&
        (this.sectionSettings.facebook_link ||
          this.sectionSettings.twitter_link ||
          this.sectionSettings.pinterest_link ||
          this.sectionSettings.youtube_link ||
          this.sectionSettings.instagram_link ||
          this.sectionSettings.blog_link)
      )
    },
    isEnabledCurrencies() {
      return (
        this.$shop.enabled_currencies &&
        this.$shop.enabled_currencies.length > 0
      )
    },
  },
  watch: {
    pointerEventsNone(value) {
      if (value) {
        setTimeout(() => {
          this.pointerEventsNone = false
        }, 800)
      }
    },
    cartDrawerHovered(val) {
      if (!this.$isMobile() && !this.isClickCartIcon) {
        if (val) {
          this.showCart = true
        } else if (!val && !this.cartIconHovered) {
          this.showCart = false
        }
      }
    },
    cartIconHovered(val) {
      if (!this.$isMobile() && !this.isClickCartIcon) {
        if (val) {
          this.showCart = true
        } else if (!val && !this.cartDrawerHovered) {
          this.showCart = false
        }
      }
    },
  },
  beforeMount() {
    this.$bus.$on('trigger-minicart-on-add-cart', this.showMiniCart)
    window.addEventListener('scroll', this.checkScroll, { passive: true })
    document.addEventListener('click', this.clickedOutside)
  },
  mounted() {
    if (!this.getLogo) {
      this.$nextTick(() => {
        this.fittyLogo()
      })
    }
    this.checkCurrencyConverter()
  },
  beforeDestroy() {
    this.$bus.$off('trigger-minicart-on-add-cart', this.showMiniCart)
    document.removeEventListener('click', this.clickedOutside)
    window.removeEventListener('scroll', this.checkScroll)
    if (this.$_fitty) {
      this.$_fitty.unsubscribe()
    }
  },
  methods: {
    checkCurrencyConverter() {
      this.currencyButton = this.$el.querySelector('.currency-converter-button')
      this.currencyRight = this.getCurrencyPositionRight()
      window.addEventListener('resize', () => {
        this.currencyRight = this.getCurrencyPositionRight()
      })
    },
    getCurrencyPositionRight() {
      if (this.currencyButton) {
        return (
          window.innerWidth -
          this.currencyButton.clientWidth -
          this.currencyButton.offsetLeft -
          16
        )
      }

      return 0
    },
    toggleCurrencyDropdown() {
      this.isShowCurrencyDropdown = !this.isShowCurrencyDropdown
    },
    openSidebarMenu() {
      this.openSidebar = true
    },
    showMiniCart() {
      this.showCart = true
    },
    toggleShowCart() {
      this.isClickCartIcon = !this.isClickCartIcon
      this.showCart = this.isClickCartIcon
      // Tracking buyer click on cart icon
      this.trackCartIconClick()
    },
    offCart() {
      this.showCart = false
    },
    actionSearch() {
      this.$router.push(this.routeToPath(`/search?q=${this.keyword}`))
    },
    checkScroll() {
      const anchorElement = this.$refs.anchor
      if (anchorElement) {
        const rect = anchorElement.getBoundingClientRect()
        this.isSticky = rect.top < 0
      }
    },
    fittyLogo() {
      const logoElement = this.$refs.logo
      if (logoElement) {
        this.$_fitty = fitty(logoElement, {
          minSize: 16,
          maxSize: 32,
          multiLine: true,
        })
      }
    },
    isInWhiteList(el) {
      if (
        this.$refs.iconCartDrawer !== undefined &&
        el === this.$refs.iconCartDrawer
      ) {
        return true
      }

      if (this.$refs.cartDrawer !== undefined && el === this.$refs.cartDrawer) {
        return true
      }

      // All chidren from icon cart drawer
      if (this.$refs.iconCartDrawer !== undefined) {
        const children = this.$refs.iconCartDrawer.querySelectorAll('*')

        for (const child of children) {
          if (el === child) {
            return true
          }
        }
      }

      // All chidren from dom cart drawer
      if (this.$refs.cartDrawer !== undefined) {
        const children = this.$refs.cartDrawer.querySelectorAll('*')

        for (const child of children) {
          if (el === child) {
            return true
          }
        }
      }

      return false
    },
    clickedOutside(event) {
      if (this.showCart && !this.isInWhiteList(event.target)) {
        this.showCart = false
        this.isClickCartIcon = false
      }
    },
    urlSrcSet(img) {
      return `${this.$resizeImage(img, '0', '180', '')} 1x, ${this.$resizeImage(
        img,
        '0',
        '180',
        '',
        'x2'
      )} 2x`
    },
  },
}
</script>
