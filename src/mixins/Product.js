import { getCoreFilter } from '../shared/filter'
import getDefaultImages from '../utils/defaultImages'
import ProductCountdown from '../mixins/ProductCountdown'
import { GroupImage } from '../mixins/GroupImage'
import ProductImages from '../blocks/Product/ProductImages'
import Dropdown from '../blocks/Product/ProductDropdown'
import focusClean from '../components/directives/focusClean'
import OptionItem from '../components/OptionItem'
import Quantity from '../components/Quantity'
import QuantityControl from '../components/QuantityControl'
import ButtonAddToCart from '../components/AddToCart'
import SocialSharing from '../components/SocialSharing'
import OptionSlider from '../components/OptionSlider'
import ProductCustomOptions from '../blocks/Product/ProductCustomOptions'
import { PRODUCT_PAGE } from '../constants'

export default {
  name: 'ProductMixin',
  components: {
    ProductImages,
    Dropdown,
    OptionItem,
    Quantity,
    QuantityControl,
    ButtonAddToCart,
    SocialSharing,
    OptionSlider,
    ProductCustomOptions,
  },
  directives: { focusClean },
  data() {
    return {
      isAddingToCart: false,
    }
  },
  mixins: [GroupImage, ProductCountdown],
  computed: {
    settings() {
      const pageSettings = this.$getPageSettings('product')
      let settings = {}

      if (pageSettings.product_page && pageSettings.product_page.settings) {
        settings = pageSettings.product_page.settings
      }

      const productSettings = this.$getThemeSettings('product_grid')
      return Object.assign({}, PRODUCT_PAGE, {
        ...settings,
        ...productSettings,
      })
    },
    settingCountdownTime() {
      return this.settings.countdown_time
    },
    options() {
      return this.$productSettings.is_using_link_option
        ? this.availableOptions
        : this.product.options
    },
    totalOptionValues() {
      const total = {}
      if (this.product.options) {
        this.product.options.forEach((option) => {
          total[option.code] = option.values.length
        })
      }

      return total
    },
    saleMessage() {
      return this.$t(`Save ${this.formatPrice(this.saleValue(this.variant))}`)
    },
    productTags() {
      return this.product.tags
        ? this.product.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        : []
    },
    noImage() {
      return getDefaultImages('productPlaceholder')
    },
    styleImageGroup() {
      return {
        height: this.variantGroupImageMaxHeight
          ? this.variantGroupImageMaxHeight + 'px'
          : '100%',
      }
    },
    showProductSummary() {
      return (
        (this.settings.show_collections &&
          this.product.collections &&
          this.product.collections.length > 0) ||
        (this.settings.show_types && this.product.product_type) ||
        (this.settings.show_tags && this.productTags.length > 0)
      )
    },
    summaryWrapperClasses() {
      return this.trustBadgeVisible ? 'pt32' : 'brdr-top-1 brdr-cl-whisper'
    },
    isAllowQuantityBoxInSameLineWithAddToCartBtn() {
      return this.settings.enable_same_line_quantity_box
    },
    wrapperClasses() {
      return this.isAllowQuantityBoxInSameLineWithAddToCartBtn
        ? 'flex align-end flow-wrap'
        : ''
    },
    quantityWrapperClasses() {
      return this.isAllowQuantityBoxInSameLineWithAddToCartBtn
        ? 'mb24'
        : 'product__quantity flex align-center mb30'
    },
    addToCartClasses() {
      return [
        'product__add-cart',
        {
          'is-soldout': this.isDisabledAddCart,
          'btn-full-width': this.isAllowQuantityBoxInSameLineWithAddToCartBtn,
        },
        {
          mt16:
            !this.settings.show_quantity_box &&
            this.settings.options_style === 'buttons',
        },
        {
          mt8: this.settings.options_style !== 'buttons',
        },
        {
          product__checkout: this.$cartSettings.type === 'check_out',
        },
      ]
    },
    trustBadgeVisible() {
      return this.settings.enable_trust_badge && this.settings.trust_badge
    },
    shareWrapperClasses() {
      return !this.trustBadgeVisible ||
        ((this.settings.show_collections &&
          this.product.collections &&
          this.product.collections.length > 0) ||
          (this.settings.show_types && this.product.product_type) ||
          (this.productTags > 0 && this.settings.show_tags))
        ? 'brdr-top-1 brdr-cl-whisper'
        : ''
    },
  },
  mounted() {
    setTimeout(() => {
      this.calculateMaxHeightForGroupImage()
    }, 1500)
  },
  methods: {
    formatPrice: getCoreFilter('price'),
    /**
     * Hide selector when option has one value
     */
    hideOptionSelector(option) {
      if (option && Object.keys(option).length) {
        return this.settings.hide_selector_enable
          ? this.totalOptionValues && this.totalOptionValues[option.code] > 1
          : true
      }
      return false
    },
    onClickThumbnail(id) {
      this.onChangeVariantId(id)
    },
    optionProps(option, value) {
      if (this.settings.enable_group_swatches && option.using_variant_group) {
        return {
          class: [
            'mr16 mb16 pointer',
            {
              'product__image-option--loaded': this.variantGroupLoaded,
            },
          ],
          typeSelector: 'image',
          src: value.group_image,
          style: this.styleImageGroup,
        }
      }

      return {
        class: 'mr8 mb8',
        color:
          this.settings.enable_color_swatches && option.using_color_swatch
            ? value.color_code
            : '',
      }
    },
    saleValue(variant) {
      return parseFloat(variant.compare_at_price) - parseFloat(variant.price)
    },
    isOnSale(variant) {
      return (
        parseFloat(variant.compare_at_price) > 0 &&
        parseFloat(variant.price) < parseFloat(variant.compare_at_price)
      )
    },
  },
  watch: {
    isCartItemAdded: {
      handler: function(val) {
        if (val) {
          this.isAddingToCart = false
        }
      },
      immediate: true,
    },
    isAddingToCart(val) {
      if (
        window &&
        window.document &&
        document.getElementsByClassName('sticky').length === 0 &&
        !val
      ) {
        window.scrollTo(0, 0)
      }
    },
  },
}
