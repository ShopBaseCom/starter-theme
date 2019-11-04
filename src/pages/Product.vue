<template>
  <div
    id="product"
    class="product-page"
    itemscope
    itemtype="http://schema.org/Product"
    data-id="product_page"
  >
    <ProductStickyBar
      v-if="
        variant.available ||
          (!unavailableVariant &&
            !isPageFetching &&
            product.variants &&
            product.variants.length > 1)
      "
      ref="sticky"
      :cart-form-id="cartFormId"
      :value="quantity"
      :is-open="isDisplaySticky && (stickyOpen || stickyOpenFromZoom)"
      :thumbnail-carousel-visible="
        thumbnailCarouselVisible && settings.enable_product_gallery_popup
      "
      :variant-id="variant.id"
      :images="product.images"
      :product-title="product.title"
      :product="product"
      :variant="variant"
      :current-option="currentOption"
      :unavailable-variant="unavailableVariant"
      :is-disabled-add-cart="isDisabledAddCart"
      :unavailable-option-items="unavailableOptionItems"
      :on-change-option="onChangeOption"
      :on-add-to-cart="onAddToCart"
      :theme-settings="settings"
      @input="onChangeQuantity"
    >
    </ProductStickyBar>

    <section class="container product-page__container">
      <div
        v-if="settings.show_breadcrumb_links"
        class="text-align-center text-align-left-md cart__breadcrumbs"
      >
        <Breadcrumbs
          :routes="breadcrumbs.routes"
          :current="breadcrumbs.current"
        ></Breadcrumbs>
      </div>
      <div class="row justify-space-between product__main-content">
        <div class="col-12 col-md-6">
          <ProductImages
            v-if="product.images && product.images.length > 0"
            id="product-image-gallery"
            class="product__gallery"
            :class="{
              pointer: settings.enable_product_gallery_popup,
            }"
            :product="product"
            :variant-id="variant.id"
            :zoom-enable="settings.enable_product_gallery_popup"
            :thumbnail-carousel-visible="thumbnailCarouselVisible"
            :sticky-bar-visible="isDisplaySticky"
            :theme-settings="settings"
            @clickZoom="() => onClickZoom(true)"
            @closeZoom="() => onClickZoom(false)"
            @click-thumbnail="onClickThumbnail"
          ></ProductImages>
          <div v-else class="aspect-ratio is-1by1">
            <img v-lazy="noImage" alt class="w-100" />
          </div>
        </div>
        <div class="col-12 col-md-6 col-xl-5">
          <div class="product__details">
            <p
              v-if="product.vendor && settings.show_vendor"
              class="product__vendor mt0 mb12"
            >
              <router-link
                :to="$routeToProductWithAttribute('vendors', product.vendor)"
              >
                {{ product.vendor }}
              </router-link>
            </p>
            <p
              v-if="variant.sku && settings.show_sku"
              class="product__sku mt0 mb16"
            >
              {{ variant.sku | htmlDecode }}
            </p>
            <h1 class="h3 product__name is-uppercase mt0 mb12" itemprop="name">
              {{ product.title | htmlDecode }}
            </h1>
            <div
              class="jdgm-widget jdgm-preview-badge mb16"
              :data-id="product.id"
            ></div>
            <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
              <link itemprop="url" :href="product.url" />
              <meta itemprop="priceCurrency" :content="$shop.currency.code" />
              <meta itemprop="price" :content="variant.price" />
              <meta itemprop="seller" :content="$shop.name | htmlDecode" />
              <link
                itemprop="availability"
                :href="
                  `http://schema.org/${
                    variant.available ? 'InStock' : 'OutOfStock'
                  }`
                "
              />
              <meta itemprop="itemCondition" content="New" />

              <div
                v-if="
                  parseFloat(variant.price) <
                    parseFloat(variant.compare_at_price)
                "
                class="product__price mt0 mb12"
              >
                <span>{{ variant.price | price }}</span>
                <span class="product__price--original">
                  {{ variant.compare_at_price | price }}
                </span>
                <span
                  v-if="saleValue(variant) > 0 && settings.show_price_savings"
                  class="product__sale-info pl16 mt0 mb24"
                >
                  {{ saleMessage }}
                </span>
              </div>
              <div v-else-if="variant.price" class="product__price mt0 mb12">
                {{ variant.price | price }}
              </div>
              <div v-else class="product__price mt0 mb12">
                {{ settings.free_product_text }}
              </div>

              <!-- Countdown timer with mobile -->
              <Countdown
                v-if="settings.enable_countdown_timer && countdownTime"
                class="hidden-sm py16 mb16 brdr-top-1 brdr-bottom-1 brdr-cl-whisper text-align-center-xs text-align-center-sm countdown-timer--sm"
                :time="countdownTime"
              >
              </Countdown>

              <div
                v-if="
                  !isPageFetching &&
                    currentOption &&
                    Object.keys(currentOption).length > 0 &&
                    product.variants &&
                    product.variants.length > 1
                "
                id="product-variants"
                class="product__variants"
              >
                <template v-for="option in options">
                  <div
                    v-if="hideOptionSelector(option)"
                    :key="option.code"
                    class="product__variants-wrapper"
                  >
                    <div class="product__variant-label mb8">
                      <span>{{ option.label }}</span>
                      <label
                        v-if="settings.options_style === 'buttons'"
                        class="mb0"
                      >
                        : {{ currentOption[option.code].label }}
                      </label>
                      <template
                        v-if="
                          sizeChartEnable &&
                            option.code.toLowerCase() === 'size'
                        "
                      >
                        <label class="product__size-guide-dash mb0">
                          -
                        </label>
                        <label
                          class="product__size-guide mb0"
                          @click="showSizeChart()"
                        >
                          {{ $t('Size Guide') }}
                        </label>
                      </template>
                    </div>
                    <div v-if="settings.options_style !== 'buttons'">
                      <div class="row m0">
                        <Dropdown
                          :id="option.id"
                          :options="option.values"
                          :selected="currentOption[option.code].id"
                          :on-change-option="onChangeOption"
                          class="mb16"
                        />
                      </div>
                    </div>
                    <div
                      v-else
                      :class="[
                        {
                          mb8: !settings.enable_group_swatches,
                          'flex flex-wrap align-center': !$isMobile(),
                        },
                      ]"
                    >
                      <OptionSlider
                        v-if="
                          $isMobile() &&
                            settings.enable_group_swatches &&
                            option.using_variant_group
                        "
                        :values="option.values"
                        :current-option-id="currentOption[option.code].id"
                      >
                        <template slot-scope="{ value }">
                          <OptionItem
                            v-focus-clean
                            :code="option.code"
                            :value="value"
                            :active="isActiveOptionItem(value)"
                            :disabled="unavailableOptionItems[value.id]"
                            :on-change-option="onChangeOption"
                            :type-selector="'slider'"
                            :src="value.group_image"
                          >
                          </OptionItem>
                        </template>
                      </OptionSlider>
                      <OptionItem
                        v-for="value in option.values"
                        v-else
                        :key="value.id"
                        v-focus-clean
                        :code="option.code"
                        :value="value"
                        :active="isActiveOptionItem(value)"
                        :disabled="unavailableOptionItems[value.id]"
                        :on-change-option="onChangeOption"
                        v-bind="optionProps(option, value)"
                      >
                      </OptionItem>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <div itemprop="brand" itemtype="http://schema.org/Thing" itemscope>
              <meta itemprop="name" :content="$shop.name" />
            </div>
            <meta itemprop="description" :content="product.meta_description" />
            <link
              v-for="(image, index) in product.images"
              :key="index"
              itemprop="image"
              :href="image.src"
            />
            <meta itemprop="sku" :content="variant.sku" />

            <!-- Countdown with Quantity in same line with AddToCart -->
            <Countdown
              v-if="
                isAllowQuantityBoxInSameLineWithAddToCartBtn &&
                  settings.enable_countdown_timer &&
                  countdownTime
              "
              class="hidden-xs mt16"
              :time="countdownTime"
            >
            </Countdown>

            <ProductCustomOptions
              v-if="!isPageFetching && product.custom_options"
              :custom-options="product.custom_options"
              :validations="validateProperties"
              :upload-progress="uploadProgress"
              :upload-accept="uploadAccept"
              @change="onChangeCustomOption"
            >
            </ProductCustomOptions>

            <label
              v-if="sizeChartEnable && !hasVariantSize"
              class="product__size-guide mb0"
              @click="showSizeChart()"
            >
              {{ $t('Size Guide') }}
            </label>

            <div id="addToCartForm" data-form="product" :class="wrapperClasses">
              <div
                v-if="settings.show_quantity_box"
                id="changeQuantityForm"
                :class="[
                  'mt8',
                  { mt16: settings.options_style === 'buttons' },
                  quantityWrapperClasses,
                ]"
              >
                <Quantity
                  v-if="!isAllowQuantityBoxInSameLineWithAddToCartBtn"
                  id="product-quantity-input"
                  :value="quantity"
                  :min="1"
                  @input="onChangeQuantity"
                />
                <QuantityControl
                  v-else
                  :value="quantity"
                  :min="1"
                  @input="onChangeQuantity"
                ></QuantityControl>

                <!-- Countdown timer with single AddToCart -->
                <Countdown
                  v-if="
                    !isAllowQuantityBoxInSameLineWithAddToCartBtn &&
                      settings.enable_countdown_timer &&
                      countdownTime
                  "
                  class="hidden-xs ml16"
                  :time="countdownTime"
                >
                </Countdown>
              </div>
              <div
                :class="[
                  'm0',
                  'mb24',
                  {
                    'add-to-cart-form ': isAllowQuantityBoxInSameLineWithAddToCartBtn,
                  },
                ]"
              >
                <div id="add-to-cart-wrapper" ref="buttonAddCart">
                  <ButtonAddToCart
                    id="add-to-cart"
                    :class="addToCartClasses"
                    name="add-to-cart"
                    :product="product"
                    :disabled="isDisabledAddCart"
                    :loading.sync="isAddingToCart"
                    :on-add-to-cart="onAddToCart"
                  >
                    <template v-if="unavailableVariant">
                      {{ $t('Unavailable') }}
                    </template>
                    <template v-else-if="!variant.available">
                      {{ $t('Sold out') }}
                    </template>
                    <template v-else-if="$cartSettings.type === 'checkout'">
                      {{ $t('Buy Now') }}
                    </template>
                  </ButtonAddToCart>
                </div>
              </div>
            </div>

            <div v-if="trustBadgeVisible" class="product__trust-badge">
              <img
                v-lazy="$resizeImage(settings.trust_badge, '0', '540', '')"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                :alt="$t('Trust badge')"
              />
            </div>
            <div
              v-if="showProductSummary"
              :class="['product__summary', 'py24', summaryWrapperClasses]"
            >
              <p
                v-if="
                  settings.show_collections &&
                    product.collections &&
                    product.collections.length > 0
                "
                class="mb0"
              >
                {{ $t('Collections: ') }}
                <template v-for="(collection, index) in product.collections">
                  <router-link
                    :key="index"
                    :to="$routeToCollection(collection)"
                  >
                    {{ collection.title }}
                  </router-link>
                  <span
                    v-if="index + 1 < product.collections.length"
                    :key="collection.id"
                    >{{ ', ' }}
                  </span>
                </template>
              </p>
              <p
                v-if="settings.show_types && product.product_type"
                class="mb12"
              >
                {{ $t('Type: ') }}
                <router-link
                  :to="
                    $routeToProductWithAttribute('types', product.product_type)
                  "
                >
                  {{ product.product_type }}
                </router-link>
              </p>
              <p
                v-if="settings.show_tags && productTags.length > 0"
                class="mb0"
              >
                {{ $t('Categories: ') }}
                <template v-for="(tag, index) in productTags">
                  <router-link
                    :key="index"
                    :to="$routeToProductWithAttribute('tags', tag)"
                  >
                    {{ tag }}
                  </router-link>
                  <span v-if="index + 1 < productTags.length" :key="tag">
                    {{ ', ' }}
                  </span>
                </template>
              </p>
            </div>
            <div
              v-if="settings.show_social_media_icons"
              :class="['product__share', 'pt24', shareWrapperClasses]"
            >
              <label>{{ $t('Share') }}:</label>
              <SocialSharing
                id="product-social-sharing"
                class="ml24"
                :product="product"
              />
            </div>

            <ProductDescriptionRight
              v-if="
                settings.template_product === 'description_right' &&
                  isVisibleProductDescription
              "
              :tabs="getAdditionalTab"
              :tab-visible="collapseTab"
              :img-error="noImage"
              :tab-heading="getTabHeading"
              :tab-body="getTabContent"
              :change-tab="changeTabStatus"
            >
            </ProductDescriptionRight>
          </div>
        </div>
      </div>
    </section>

    <ProductDescriptionBottom
      v-if="
        settings.template_product === 'description_bottom' &&
          isVisibleProductDescription
      "
      :tabs="getAdditionalTab"
      :tab-visible="collapseTab"
      :img-error="noImage"
      :tab-heading="getTabHeading"
      :tab-body="getTabContent"
      :change-tab="changeTabStatus"
    >
    </ProductDescriptionBottom>

    <section class="container">
      <div class="row justify-space-between">
        <div class="col-12">
          <div
            v-if="
              settings.product_review_type &&
                settings.product_review_type === 'single'
            "
            class="jdgm-widget jdgm-review-widget"
            :data-product-title="product.name"
            :data-id="product.id"
          ></div>
          <div
            v-if="
              settings.product_review_type &&
                settings.product_review_type === 'all'
            "
            class="jdgm-widget jdgm-all-reviews-widget"
          >
            <div class="jdgm-all-reviews__body"></div>
          </div>
        </div>
      </div>
    </section>

    <SizeChart
      v-if="isVisibleSizeChart"
      :size-chart="sizeChart"
      @close="onCloseSizeChart"
    ></SizeChart>
  </div>
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs'
import ProductDescriptionBottom from '../blocks/Product/ProductDescriptionBottom'
import ProductDescriptionRight from '../blocks/Product/ProductDescriptionRight'
import ProductStickyBar from '../blocks/Product/ProductStickyBar'
import Product from '../mixins/Product'
import SizeChart from '../mixins/SizeChart'

export default {
  name: 'Product',
  components: {
    ProductStickyBar,
    Breadcrumbs,
    ProductDescriptionBottom,
    ProductDescriptionRight,
  },
  mixins: [Product, SizeChart],
  props: {
    uploadAccept: {
      type: String,
      default: '*',
    },
    isPageFetching: {
      type: Boolean,
      default: true,
    },
    isCartItemAdded: {
      type: Boolean,
      default: false,
    },
    breadcrumbs: {
      type: Object,
      default: () => {},
    },
    product: {
      type: Object,
      default: () => {},
    },
    quantity: {
      type: Number,
      default: null,
    },
    variant: {
      type: Object,
      default: () => {},
    },
    availableOptions: {
      type: Array,
      default: () => [],
    },
    productDescription: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    currentOption: {
      type: Object,
      default: () => {},
    },
    unavailableOptionItems: {
      type: Object,
      default: () => {},
    },
    validateProperties: {
      type: Object,
      default: () => {},
    },
    uploadProgress: {
      type: Object,
      default: () => {},
    },
    isActiveOptionItem: {
      type: Function,
      default: () => {},
    },
    onChangeOption: {
      type: Function,
      default: () => {},
    },
    onChangeVariantId: {
      type: Function,
      default: () => {},
    },
    onChangeCustomOption: {
      type: Function,
      default: () => {},
    },
    unavailableVariant: {
      type: Boolean,
      default: false,
    },
    onAddToCart: {
      type: Function,
      default: () => {},
    },
    onChangeQuantity: {
      type: Function,
      default: () => {},
    },
    isDisabledAddCart: {
      type: Boolean,
      default: false,
    },
    pages: {
      type: Array,
      default: () => [],
    },
    cartFormId: {
      type: String,
      default: 'default',
    },
    onFetchSizeChart: {
      type: Function,
      default: () => {},
    },
    sizeChartEnable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      thumbnailCarouselVisible: false,
      stickyOpen: false,
      stickyOpenFromZoom: false,
      userHasScrolled: false,
      collapseTab: {},
    }
  },
  computed: {
    isDisplaySticky() {
      switch (this.settings.display_on) {
        case 'all':
          return this.settings.show_sticky_button
        case 'mobile_phone':
          return this.settings.show_sticky_button && this.$isMobile()
        case 'tablet_and_desktop':
          return this.settings.show_sticky_button && !this.$isMobile()
        default:
          return false
      }
    },
    optionBarVisible() {
      return this.product.variants && this.product.variants.length === 1
    },
    getAdditionalTab() {
      return this.settings.blocks.filter((block) => {
        switch (block.element_type) {
          case 'page':
            return block.page
          case 'additional-tab':
            return block.content && block.heading
          default:
            return this.description && this.description !== '<p><br></p>'
        }
      })
    },
    isVisibleProductDescription() {
      return (
        (this.description && this.description !== '<p><br></p>') ||
        this.getAdditionalTab.length
      )
    },
  },
  watch: {
    isCartItemAdded: {
      handler: function(val) {
        if (val) {
          this.stickyOpen = false
          if (!this.thumbnailCarouselVisible) {
            this.stickyOpenFromZoom = false
          }
          this.isAddingToCart = false
          if (this.$refs.sticky) this.$refs.sticky.isAddingToCart = false
        }
      },
      immediate: true,
    },
    isPageFetching: {
      handler(val) {
        setTimeout(() => {
          if (this.$isMobile() && !val && !this.userHasScrolled) {
            this.scrollPassHeader()
          }
        }, 3000)
        if (!val) {
          this.getTimer()
        }
      },
      immediate: true,
    },
    getAdditionalTab: {
      handler(val) {
        if (val && val.length) {
          this.collapseTab = val.reduce(
            (obj, item, index) => ({ ...obj, [index]: !item.collapse_tab }),
            {}
          )
        }
      },
      immediate: true,
    },
  },
  beforeMount() {
    window.addEventListener('scroll', this.controlSticky, { passive: true })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.controlSticky)
  },
  mounted() {
    window.onscroll = () => {
      this.userHasScrolled = true
    }

    if (this.$refs.sticky) {
      this.controlSticky()
    }
  },
  methods: {
    /**
     * Check if cta element is not visible on screen show sticky bar
     */
    controlSticky() {
      const buttonAddToCart = this.$refs.buttonAddCart
      if (buttonAddToCart) {
        this.stickyOpen = !this.ctaInViewport(buttonAddToCart)
      }
    },
    onClickZoom(zoom) {
      if (this.settings.enable_product_gallery_popup) {
        this.stickyOpenFromZoom = zoom
        this.thumbnailCarouselVisible = zoom
      }
    },
    /**
     * Check cta element is in the viewport
     * @param elem
     * @return {boolean}
     */
    ctaInViewport(elem) {
      const bounding = elem.getBoundingClientRect()
      return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      )
    },
    scrollPassHeader() {
      if (this.$isServer) return
      const elemHeader = window.document.querySelector('[data-id="header"]')
      if (elemHeader) {
        const heightHeader = elemHeader.clientHeight
        let i = 0
        const int = setInterval(() => {
          window.scrollTo(0, i)
          i += 1
          if (i >= heightHeader) clearInterval(int)
        }, 2)
      }
    },
    getTabHeading(block) {
      if (block.element_type === 'page') {
        let page = ''
        page = this.pages.find((page) => page.handle === block.page)
        return page && page.title ? page.title : ''
      } else {
        return block.heading
      }
    },
    getTabContent(block) {
      switch (block.element_type) {
        case 'page': {
          let page = ''
          page = this.pages.find((page) => page.handle === block.page)
          return page && page.content
            ? this.setLazyImgDescription(page.content)
            : ''
        }
        case 'additional-tab': {
          return this.setLazyImgDescription(block.content)
        }
        default: {
          return this.description
        }
      }
    },
    setLazyImgDescription(description) {
      return description
        .replace(/(<img[^>]*)(data-lazy-src)([^>]*>)/gm, '$1src$3')
        .replace(/(<img[^>]*)(src)([^>]*>)/gm, '$1data-src$3')
    },
    changeTabStatus(index) {
      this.$set(this.collapseTab, index, !this.collapseTab[index])
    },
  },
}
</script>
