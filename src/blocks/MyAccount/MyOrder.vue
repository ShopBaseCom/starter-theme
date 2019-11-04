<template>
  <div class="mb35 scoped my-order">
    <template v-if="order">
      <!-- My order header -->
      <div class="row">
        <div class="col-12">
          <h3 class="m0 mb5 order-number">
            {{ $t('Order ') }}{{ order.name }}
          </h3>
        </div>
      </div>
      <!-- My order body -->
      <div class="row">
        <div class="col-12">
          <p class="m0 mb24 date order-date">
            {{ formattedDate(order.created_at) }}
          </p>
        </div>
      </div>
      <div class="row between-xs">
        <div class="col-12 col-md-8">
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>{{ $t('Product') }}</th>
                  <th>{{ $t('SKU') }}</th>
                  <th>{{ $t('Price') }}</th>
                  <th class="align-center">{{ $t('Quantity') }}</th>
                  <th class="align-right">{{ $t('Total') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orderItems" :key="item.item_id">
                  <td :data-th="$t('Product Name')">
                    <router-link
                      v-if="item.slug"
                      :to="$routeToProduct(item)"
                      class="no-underline item__link"
                    >
                      <span class="item__name">{{ item.name }}</span>
                      <span
                        v-if="checkItemHasVariantOptions(item)"
                        class="item__variant"
                        >{{ getItemVariantOptions(item) }}</span
                      >
                      <template
                        v-if="item.properties && item.properties.length"
                      >
                        <span
                          v-for="(property, index) in item.properties"
                          :key="index"
                          class="item__variant"
                        >
                          {{ property.name }}: {{ property.value }}
                        </span>
                      </template>
                    </router-link>
                    <template v-else class="item__name">
                      <span>{{ item.name }}</span>
                      <span
                        v-if="checkItemHasVariantOptions(item)"
                        class="item__variant"
                        >{{ getItemVariantOptions(item) }}</span
                      >
                      <template
                        v-if="item.properties && item.properties.length"
                      >
                        <span
                          v-for="(property, index) in item.properties"
                          :key="index"
                          class="item__variant"
                        >
                          {{ property.name }}: {{ property.value }}
                        </span>
                      </template>
                    </template>
                  </td>
                  <td :data-th="$t('SKU')">{{ item.sku }}</td>
                  <td :data-th="$t('Price')">
                    {{ item.price_incl_tax | price }}
                  </td>
                  <td class="align-center" :data-th="$t('Quantity')">
                    {{ item.qty_ordered }}
                  </td>
                  <td class="align-right" :data-th="$t('Total')">
                    {{ item.row_total_incl_tax | price }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="order-summary">
            <div class="order-summary__row">
              <div class="order-summary__name align-left">
                {{ $t('Subtotal') }}
              </div>
              <div class="order-summary__price align-right">
                {{ order.subtotal | price }}
              </div>
            </div>
            <div v-if="order.discount" class="order-summary__row">
              <div class="order-summary__name align-left">
                {{ $t('Discount') }}
              </div>
              <div class="order-summary__price align-right">
                - {{ order.discount | price }}
              </div>
            </div>
            <div class="order-summary__row">
              <div class="order-summary__name align-left">
                {{ $t('Shipping') }}
              </div>
              <div class="order-summary__price align-right">
                {{ order.shipping_amount | price }}
              </div>
            </div>
            <div class="order-summary__row">
              <div class="order-summary__name align-left">{{ $t('Tax') }}</div>
              <div class="order-summary__price align-right">
                {{ order.tax_amount | price }}
              </div>
            </div>
            <div class="order-summary__row">
              <div class="order-summary__name align-left weight-700">
                {{ $t('Total') }}
              </div>
              <div class="order-summary__price align-right weight-700">
                {{ order.grand_total | price }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-4 mb32">
          <div class="row">
            <div class="col-12">
              <h3 class="address-title">{{ $t('Billing address') }}</h3>
              <p class="order-status">
                {{ $t('Payment Status') }}:
                {{ order.status ? capitalizeFirstLetter(order.status) : '' }}
              </p>
              <address>
                <p
                  >{{ order.billing_address.firstname }}
                  {{ order.billing_address.lastname }}</p
                >
                <p v-if="order.billing_address.street"
                  >{{ order.billing_address.street[0] }},
                  {{ order.billing_address.street[1] }}</p
                >
                <p
                  >{{ order.billing_address.city }}
                  {{ order.billing_address.postcode }}</p
                >
                <p
                  >{{ getCountryName(order.billing_address.country_id) }}
                  {{
                    getProvinceName(
                      order.billing_address.country_id,
                      order.billing_address.province_id
                    )
                  }}</p
                >
                <p>{{ order.billing_address.telephone }}</p>
              </address>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 mb32">
          <div class="row">
            <div class="col-12">
              <h3 class="address-title">{{ $t('Shipping address') }}</h3>
              <p class="order-status">
                {{ $t('Fulfillment Status') }}:
                {{
                  order.fullfillment_status
                    ? capitalizeFirstLetter(order.fullfillment_status)
                    : ''
                }}
              </p>
              <address>
                <p>
                  {{ order.shipping_address.firstname }}
                  {{ order.shipping_address.lastname }}
                </p>
                <p v-if="order.shipping_address.street">
                  {{ order.shipping_address.street[0] }},
                  {{ order.shipping_address.street[1] }}
                </p>
                <p>
                  {{ order.shipping_address.city }}
                  {{ order.shipping_address.postcode }}
                </p>
                <p>
                  {{ getCountryName(order.shipping_address.country_id) }}
                  {{
                    getProvinceName(
                      order.shipping_address.country_id,
                      order.shipping_address.province_id
                    )
                  }}
                </p>
                <p>{{ order.shipping_address.telephone }}</p>
              </address>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb96">
        <div class="col-12">
          <router-link
            :to="$routeToMyAccount()"
            class="flex justify-center align-center :hover-no-underline"
          >
            <span class=":hover-underline">
              {{ $t('Return to Account details') }}
            </span>
          </router-link>
        </div>
      </div>
    </template>
    <div v-else> </div>
  </div>
</template>

<script>
import { getCoreFilter } from '../../shared/filter'
export default {
  props: {
    order: {
      type: Object,
      default: () => {},
    },
    orderCreateDate: {
      type: String,
      default: '',
    },
    orderItems: {
      type: Array,
      default: () => [],
    },
    checkItemHasVariantOptions: {
      type: Function,
      default: () => {},
    },
    getItemVariantOptions: {
      type: Function,
      default: () => {},
    },
    getCountryName: {
      type: Function,
      default: () => {},
    },
    getProvinceName: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    formattedDate(date) {
      return this.formatDate(date, 'MMM DD, YYYY')
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    formatDate: getCoreFilter('date'),
  },
}
</script>
