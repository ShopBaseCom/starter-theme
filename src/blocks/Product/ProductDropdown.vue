<template>
  <div class="product-dropdown">
    <select v-model="internalSelected">
      <option
        v-for="(option, index) in options"
        :key="index"
        :disabled="typelength < 2"
        :value="option.id"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: [String, Number],
      required: false,
      default: () => false,
    },
    options: {
      type: [String, Number, Boolean, Object, Array, Symbol, Function],
      default: null,
    },
    selected: {
      type: Number,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    typelength: {
      type: Number,
      default: undefined,
    },
    onChangeOption: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      internalSelected: this.selected,
    }
  },
  watch: {
    selected(val) {
      this.internalSelected = val
    },
    internalSelected(val) {
      const find = this.options.find((option) => option.id === val)

      if (find) {
        this.onChangeOption({
          id: find.id,
          label: find.label,
          code: find.code,
        })
      }
    },
  },
}
</script>
