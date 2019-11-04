<template>
  <div class="select-box">
    <label v-if="label" class="d-block has-text-weight-bold">{{ label }}</label>
    <div class="base-select">
      <select
        :name="name"
        :class="{
          'cl-tertiary': options.length === 0,
          empty: !selected,
        }"
        :autocomplete="autocomplete"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @change="$emit('input', $event.target.value)"
      >
        <option v-if="!selected" disabled selected value></option>
        <option
          v-for="(option, key) in options"
          :key="key"
          :value="option[valueField]"
          v-bind="{ selected: option.value.toString() === selected.toString() }"
        >
          {{ option[textField] }}
        </option>
      </select>
      <label v-if="placeholder">{{ placeholder }}</label>
      <i class="base-select__icon"></i>

      <ValidationMessages v-if="validations" :validations="validations" />
    </div>
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue'

export default {
  name: 'BaseSelect',
  components: {
    ValidationMessages,
  },
  props: {
    id: {
      type: String,
      required: false,
      default: '',
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    valueField: {
      type: String,
      default: 'value',
    },
    textField: {
      type: String,
      default: 'label',
    },
    selected: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
    autocomplete: {
      type: String,
      required: false,
      default: '',
    },
    validations: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
