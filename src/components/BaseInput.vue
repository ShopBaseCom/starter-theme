<template>
  <div class="relative input-base">
    <label v-if="label" class="d-block has-text-weight-bold">{{ label }}</label>
    <input
      :ref="name"
      class="w-100"
      :class="{
        pr42: type === 'password',
        empty: value === '',
        'brdr-cl-red': validations.filter((validation) => validation.condition)
          .length,
      }"
      :type="type === 'password' ? passType : type"
      :name="name"
      :autocomplete="autocomplete"
      :value="value"
      :autofocus="autofocus"
      :placeholder="placeholder"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur')"
      @keyup.enter="$emit('keyup.enter', $event.target.value)"
      @keyup="$emit('keyup', $event)"
    />
    <button
      v-if="iconActive"
      type="button"
      tabindex="-1"
      class="icon-visibility"
      :aria-label="$t('Toggle password visibility')"
      :title="$t('Toggle password visibility')"
      @click="togglePassType()"
    >
      <svg>
        <use :xlink:href="`#ic_${icon}_24px`"></use>
      </svg>
    </button>
    <ValidationMessages v-if="validations" :validations="validations" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue'

export default {
  name: 'BaseInput',
  components: {
    ValidationMessages,
  },
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      required: true,
    },
    // eslint-disable-next-line
    value: {
      default: '',
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    autocomplete: {
      type: String,
      required: false,
      default: '',
    },
    focus: {
      type: Boolean,
      required: false,
      default: false,
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false,
    },
    validations: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      passType: 'password',
      iconActive: false,
      icon: 'visibility',
    }
  },
  created() {
    if (this.type === 'password') {
      this.iconActive = true
    }
  },
  mounted() {
    if (this.focus) {
      this.$refs[this.name].focus()
    }
  },
  methods: {
    togglePassType() {
      if (this.passType === 'password') {
        this.passType = 'text'
        this.icon = 'visibility_off'
      } else {
        this.passType = 'password'
        this.icon = 'visibility'
      }
    },
    // setFocus sets focus on a field which has a value of 'ref' tag equal to fieldName
    setFocus(fieldName) {
      if (this.name === fieldName) {
        this.$refs[this.name].focus()
      }
    },
  },
}
</script>
