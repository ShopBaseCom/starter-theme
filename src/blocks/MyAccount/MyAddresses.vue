<template>
  <div id="my-addresses" class="scoped my-address">
    <section class="container mb55">
      <div class="row address-wrapper">
        <div class="col-12 col-md-8 last-md">
          <h6 class="has-text-weight-semibold">Your addresses</h6>
          <div
            v-for="address in currentUser.addresses"
            :key="address.id"
            class="address-item mb24"
          >
            <div class="address-details mb16">
              <p
                >{{ address.firstname }} {{ address.lastname }}
                <strong
                  v-if="
                    currentUser.default_shipping &&
                      address.id === currentUser.default_shipping
                  "
                >
                  {{ $t('Default') }}
                </strong>
              </p>
              <p>{{ address.street[0] }}, {{ address.street[1] }}</p>
              <p>{{ address.city }} {{ address.postcode }}</p>
              <p
                >{{ getCountryName(address.country_id) }}
                {{
                  getProvinceName(address.country_id, address.province_id)
                }}</p
              >
              <p>{{ address.telephone }}</p>
            </div>
            <button class="delete-button" @click="deleteAddress(address.id)">
              {{ $t('Delete') }}
            </button>
          </div>
        </div>
        <div class="col-12 col-md-4 first-md return-text">
          <router-link
            class="flex justify-center align-center :hover-no-underline"
            :to="$routeToMyAccount()"
          >
            <i class="material-icons cl-accent">chevron_left</i>
            <span class=":hover-underline">
              {{ $t('Return to Account details') }}
            </span>
          </router-link>
        </div>
      </div>
    </section>
    <Modal
      name="modal-delete-address"
      title="Confirm delete address"
      :is-show.sync="isShowDeleteModal"
    >
      <div>
        <p class="display-5 cl-gray-nero mb24">
          {{ $t('Are you sure you want to delete this address?') }}
        </p>
      </div>
      <div class="row justify-end">
        <button class="btn btn-outline" @click="close">
          {{ $t('Cancel') }}
        </button>
        <button class="modal-button-danger btn-primary" @click="confirm">
          {{ $t('Delete') }}
        </button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '../../components/Modal'
export default {
  name: 'MyAddresses',
  components: {
    Modal,
  },
  props: {
    currentUser: {
      type: Object,
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
    onDeleteAddress: {
      type: Function,
      default: () => {},
    },
    closeModal: {
      type: Function,
      default: () => {},
    },
    confirmDelete: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      isShowDeleteModal: false,
    }
  },
  methods: {
    close() {
      this.isShowDeleteModal = false
      this.closeModal()
    },
    confirm() {
      this.isShowDeleteModal = false
      this.confirmDelete()
    },
    deleteAddress(id) {
      this.isShowDeleteModal = true
      this.onDeleteAddress(id)
    },
  },
}
</script>
