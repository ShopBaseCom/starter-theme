<template>
  <div class="mb35 scoped my-oders">
    <!-- My orders header -->
    <div class="row mb15">
      <div class="col-12 col-sm-6">
        <h4 class="m0 mb5">
          {{ $t('Order history') }}
        </h4>
      </div>
    </div>
    <!-- My orders body -->
    <div class="row">
      <div v-show="!isHistoryEmpty" class="col-12">
        <table class="brdr-1">
          <thead>
            <tr>
              <th class="p20 serif lh20">{{ $t('Order ID') }}</th>
              <th class="p20 serif lh20 hide-on-xs">
                {{ $t('Date and time') }}
              </th>
              <th class="p20 serif lh20 hide-on-xs">{{ $t('Author') }}</th>
              <th class="p20 serif lh20 hide-on-xs">{{ $t('Value') }}</th>
              <th class="p20 serif lh20 hide-on-xs">{{ $t('Type') }}</th>
              <th class="p20 serif lh20 hide-on-xs">{{ $t('Status') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in ordersHistory"
              :key="order.entity_id"
              class="brdr-top-1"
            >
              <td class="lh25">
                <router-link
                  class="no-underline d-block py10 px15"
                  :to="$routeToPath(`/my-account/orders/${order.entity_id}`)"
                >
                  {{ order.name }}
                </router-link>
              </td>
              <td class="lh25 date hide-on-xs">
                {{ order.created_at | date }}
              </td>
              <td class="lh25 hide-on-xs">
                {{ order.customer_firstname }}
                {{ order.customer_lastname }}
              </td>
              <td class="lh25 hide-on-xs">{{ order.grand_total | price }}</td>
              <td class="lh25 hide-on-xs">{{ $t('Purchase') }}</td>
              <td class="lh25 hide-on-xs">{{ order.status | capitalize }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-show="isHistoryEmpty" class="col-12 h4">
        <p>{{ $t('No orders yet') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ordersHistory: {
      type: Array,
      default: () => [],
    },
    isHistoryEmpty: {
      type: Boolean,
      default: false,
    },
    remakeOrder: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
