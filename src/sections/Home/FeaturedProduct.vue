<template>
  <ProductPlaceholder
    v-if="
      !featuredSettings.product ||
        !featuredSettings.product.handle ||
        !product ||
        !product.id
    "
    :settings="featuredSettings"
  >
  </ProductPlaceholder>
  <div
    v-else
    :id="`featured-product-${featuredIndex}`"
    class="product-page"
    itemscope
    itemtype="http://schema.org/Product"
  >
    <div class="container pt40">
      <div class="row justify-space-between product__main-content">
        <div
          :class="[
            'col-12 col-md-6',
            { 'order-sm-2': featuredSettings.image_position === 'right' },
          ]"
        >
          <ProductImages
            v-if="product.images && product.images.length > 0"
            :id="`product-image-gallery${featuredIndex}`"
            class="product__gallery"
            :class="{
              pointer: featuredSettings.enable_product_gallery_slideshow,
            }"
            :product="product"
            :variant-id="variant.id"
            :thumbnail-carousel-visible="true"
            :zoom-enable="featuredSettings.enable_product_gallery_slideshow"
            :theme-settings="settings"
            :featured-product-settings="featuredSettings"
            @click-thumbnail="onClickThumbnail"
          >
          </ProductImages>
          <div v-else class="aspect-ratio is-1by1">
            <img v-lazy="noImage" alt class="w-100" />
          </div>
        </div>
        <div
          :class="[
            'col-12 col-md-6 col-xl-5',
            { 'order-sm-1': featuredSettings.image_position === 'right' },
          ]"
        >
          <div class="product__details">
            <p
              v-if="product.vendor && featuredSettings.show_vendor"
              class="product__vendor mt0 mb12"
            >
              <router-link
                :to="$routeToProductWithAttribute('vendors', product.vendor)"
              >
                {{ product.vendor }}
              </router-link>
            </p>
            <p
              v-if="product.sku && settings.show_sku"
              class="product__sku mt0 mb16"
            >
              {{ product.sku | htmlDecode }}
            </p>
            <router-link
              class="h3 is-uppercase mt0 mb12 :hover-no-underline product__name"
              itemprop="name"
              :to="$routeToProduct(product)"
            >
              {{ product.title | htmlDecode }}
            </router-link>
            <div
              class="jdgm-widget jdgm-preview-badge mb16"
              :data-id="product.id"
            ></div>
            <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
              <meta itemprop="priceCurrency" :content="$shop.currency.code" />
              <meta itemprop="price" :content="variant.price" />
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
                  v-if="
                    saleValue(variant) > 0 &&
                      featuredSettings.show_price_savings
                  "
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
                  currentOption &&
                    Object.keys(currentOption).length > 0 &&
                    product.variants &&
                    product.variants.length > 1
                "
                :id="`product-variants-${featuredIndex}`"
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
                        >: {{ currentOption[option.code].label }}
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
                    <div
                      v-if="settings.options_style === 'select_dropdown_list'"
                    >
                      <div class="row m0">
                        <Dropdown
                          :id="option.id"
                          :code="option.code"
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
              v-if="product.custom_options"
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

            <div
              :id="`addToCartForm-${featuredIndex}`"
              data-form="product"
              :class="wrapperClasses"
            >
              <div
                v-if="settings.show_quantity_box"
                :id="`changeQuantityForm-${featuredIndex}`"
                :class="[
                  'mt8',
                  { mt16: settings.options_style === 'buttons' },
                  quantityWrapperClasses,
                ]"
              >
                <Quantity
                  v-if="!isAllowQuantityBoxInSameLineWithAddToCartBtn"
                  :id="`product-quantity-input-${featuredIndex}`"
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
                <ButtonAddToCart
                  :id="`add-to-cart-${featuredIndex}`"
                  ref="buttonAddCart"
                  :data-cart-form-id="cartFormId"
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
                  <template v-else-if="cartSettings.cart_type === 'check_out'">
                    {{ $t('Buy Now') }}
                  </template>
                </ButtonAddToCart>
              </div>
            </div>

            <div v-if="trustBadgeVisible" class="product__trust-badge">
              <img
                v-lazy="$resizeImage(settings.trust_badge, '0', '540', '')"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                alt="Trust badge"
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
                :id="`product-social-sharing-${featuredIndex}`"
                class="ml24"
                :product="product"
              />
            </div>
            <router-link
              v-if="!featuredSettings.show_product_description"
              :to="$routeToProduct(product)"
            >
              {{ $t('View product details') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="
        featuredSettings.show_product_description &&
          description &&
          description !== '<p><br></p>'
      "
      class="container-fluid no-padding"
    >
      <div class="product__description">
        <div class="container">
          <div class="row justify-center">
            <div
              v-lazy-container="{ selector: 'img', error: noImage }"
              class="col-12 col-md-10"
            >
              <div itemprop="description" v-html="description"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SizeChart
      v-if="isVisibleSizeChart"
      :size-chart="sizeChart"
      @close="onCloseSizeChart"
    ></SizeChart>
  </div>
</template>

<script>
import { getCoreMixin } from '../../shared/mixin'
import { isObjectDiff } from '../../utils/object'
import ProductMixin from '../../mixins/Product'
import SizeChartMixins from '../../mixins/SizeChart'
import ProductPlaceholder from '../../blocks/Product/ProductPlaceholder'

export default {
  name: 'FeaturedProduct',
  components: {
    ProductPlaceholder,
  },
  mixins: [getCoreMixin('productMixin'), ProductMixin, SizeChartMixins],
  props: {
    featuredIndex: {
      type: Number,
      default: null,
      required: false,
    },
    featuredSettings: {
      type: Object,
      default: () => {},
    },
    product: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    product: {
      handler: function(val, oldVal) {
        if (val && Object.keys(val).length && isObjectDiff(val, oldVal)) {
          this.initialize()
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getTimer()
    })
  },
}
</script>
