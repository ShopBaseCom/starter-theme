<template>
  <div class="mb35 scoped my-profile">
    <!-- My profile header -->
    <div class="row mb15">
      <div v-if="!isEditing" class="col-12 col-sm-6">
        <h4 class="m0 mb15">
          {{ $t('My profile') }}
        </h4>
      </div>
      <div class="col-12 col-sm-6">
        <div v-if="!isEditing" class="lh30 flex edit-profile">
          <a href="#" class="flex :hover-no-underline" @click.prevent="onEdit">
            <span class="pr5 :hover-underline">
              {{ $t('Edit your profile') }}
            </span>
            <span class="edit-profile__icon"></span>
          </a>
        </div>
      </div>
    </div>
    <!-- My profile body (edit mode) -->
    <div v-if="isEditing" class="row mt32 flow-column items-center">
      <div class="col-12 col-sm-4 mb12">
        <BaseInput
          v-model.trim="currentUser.firstname"
          type="text"
          name="first-name"
          autocomplete="given-name"
          :placeholder="$t('First name')"
          :validations="[
            {
              condition: !validationModel.currentUser.firstname.required,
              text: $t('Field is required'),
            },
            {
              condition: !validationModel.currentUser.firstname.minLength,
              text: $t('Name must have at least 2 letters.'),
            },
          ]"
          @input="validationModel.currentUser.firstname.$touch()"
        />
      </div>

      <div class="col-12 col-sm-4 mb12">
        <BaseInput
          v-model.trim="currentUser.lastname"
          type="text"
          name="last-name"
          autocomplete="family-name"
          :placeholder="$t('Last name')"
          :validations="[
            {
              condition: !validationModel.currentUser.lastname.required,
              text: $t('Field is required'),
            },
          ]"
          @input="validationModel.currentUser.lastname.$touch()"
        />
      </div>

      <div class="col-12 col-sm-4 mb12">
        <BaseInput
          v-model="currentUser.email"
          type="email"
          name="email-address"
          autocomplete="email"
          :placeholder="$t('Email address')"
          :validations="[
            {
              condition: !validationModel.currentUser.email.required,
              text: $t('Field is required'),
            },
            {
              condition: !validationModel.currentUser.email.email,
              text: $t('Please provide valid e-mail address.'),
            },
          ]"
        />
      </div>

      <!-- Change password (edit mode) -->
      <BaseCheckbox
        id="changePassword"
        class="col-12 col-sm-4 mb12"
        :value="isChangingPassword"
        :native-value="isChangingPassword"
        @click="$emit('update:is-changing-password', !isChangingPassword)"
      >
        {{ $t('Change my password') }}
      </BaseCheckbox>

      <template v-if="isChangingPassword">
        <div class="col-12 col-sm-4 mb12">
          <BaseInput
            type="password"
            name="old-password"
            autocomplete="current-password"
            :placeholder="$t('Current password *')"
            :value="oldPassword"
            :validations="[
              {
                condition:
                  !validationModel.oldPassword.required &&
                  validationModel.oldPassword.$error,
                text: $t('Field is required'),
              },
            ]"
            @input="onOldPasswordChange"
          />
        </div>

        <div class="col-12 col-sm-4 mb12">
          <BaseInput
            type="password"
            name="password"
            autocomplete="new-password"
            :placeholder="$t('New password *')"
            :value="password"
            :validations="[
              {
                condition:
                  !validationModel.password.required &&
                  validationModel.password.$error,
                text: $t('Field is required'),
              },
            ]"
            @input="onPasswordChange"
          />
        </div>

        <div class="col-12 col-sm-4 mb12">
          <BaseInput
            type="password"
            name="password-confirm"
            autocomplete="new-password"
            :placeholder="$t('Repeat new password *')"
            :value="rePassword"
            :validations="[
              {
                condition:
                  !validationModel.rPassword.required &&
                  validationModel.rPassword.$error,
                text: $t('Field is required'),
              },
              {
                condition: !validationModel.rPassword.sameAsPassword,
                text: $t('Passwords must be identical.'),
              },
            ]"
            @input="onRePasswordChange"
          />
        </div>
      </template>

      <div class="col-12 col-sm-4">
        <button
          class="btn btn-primary fullwidth"
          :disabled="checkValidation()"
          @click.prevent="onUpdateProfile"
        >
          {{ $t('Update my profile') }}
        </button>
      </div>
      <div class="mt5">
        <a
          href="#"
          class="cl-accent button-cancel"
          @click.prevent="onExitEditMode"
        >
          {{ $t('Cancel') }}
        </a>
      </div>
    </div>

    <!-- My profile summary -->
    <div v-else class="row mb35">
      <div class="col-12">
        <p> {{ currentUser.firstname }} {{ currentUser.lastname }} </p>
        <p>
          {{ currentUser.email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCheckbox from '../../components/BaseCheckbox.vue'
import BaseInput from '../../components/BaseInput.vue'
export default {
  components: {
    BaseCheckbox,
    BaseInput,
  },
  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },
    onEdit: {
      type: Function,
      default: () => {},
    },
    validationModel: {
      type: Object,
      default: () => {},
    },
    currentUser: {
      type: Object,
      default: () => {},
    },
    isChangingPassword: {
      type: Boolean,
      default: false,
    },
    oldPassword: {
      type: String,
      default: '',
    },
    onOldPasswordChange: {
      type: Function,
      default: () => {},
    },
    password: {
      type: String,
      default: '',
    },
    onPasswordChange: {
      type: Function,
      default: () => {},
    },
    rePassword: {
      type: String,
      default: '',
    },
    onRePasswordChange: {
      type: Function,
      default: () => {},
    },
    onUpdateProfile: {
      type: Function,
      default: () => {},
    },
    onExitEditMode: {
      type: Function,
      default: () => {},
    },
    checkValidation: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
