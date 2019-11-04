<template>
  <div class="product-property">
    <div
      v-for="(property, index) in customOptions"
      :key="index"
      class="product-property__field mt16"
    >
      <BaseInput
        v-if="property.type === 'text'"
        type="text"
        :label="property.label"
        :value="optionValues[property.id]"
        :placeholder="property.placeholder"
        :validations="[
          {
            condition: property.id in validations,
            text: validations[property.id],
          },
        ]"
        @input="onChange(property.id, $event)"
      >
      </BaseInput>
      <BaseTextarea
        v-else-if="property.type === 'textarea'"
        :label="property.label"
        :value="optionValues[property.id]"
        :placeholder="property.placeholder"
        :validations="[
          {
            condition: property.id in validations,
            text: validations[property.id],
          },
        ]"
        @input="onChange(property.id, $event)"
      >
      </BaseTextarea>
      <BaseSelect
        v-else-if="property.type === 'select'"
        name="properties[Select]"
        text-field="text"
        :label="property.label"
        :options="property.values"
        :selected="optionValues[property.id]"
        @input="onChange(property.id, $event)"
      >
      </BaseSelect>
      <div v-else-if="property.type === 'radio'" class="radio-group">
        <label class="d-block has-text-weight-bold">{{ property.label }}</label>
        <BaseRadio
          v-for="(option, key) in property.values"
          :key="key"
          :value="optionValues[property.id]"
          :native-value="option.value"
          @input="onChange(property.id, $event)"
        >
          {{ option.text }}
        </BaseRadio>
      </div>
      <div v-else-if="property.type === 'checkbox'" class="checkbox-group">
        <label class="d-block has-text-weight-bold">{{ property.label }}</label>
        <BaseCheckbox
          v-for="(option, key) in property.values"
          :key="key"
          :value="optionValues[property.id]"
          :native-value="option.value"
          :true-value="option.value"
          false-value=""
          @input="onChange(property.id, $event)"
        >
          {{ option.text }}
        </BaseCheckbox>
      </div>
      <BaseUpload
        v-else-if="property.type === 'file'"
        :label="property.label"
        :validations="[
          {
            condition: property.id in validations,
            text: validations[property.id],
          },
        ]"
        :progress="uploadProgress[property.id]"
        :upload-accept="uploadAccept"
        @input="onChange(property.id, $event)"
      >
        <div class="file-help-text mt5">{{ property.help_text }}</div>
      </BaseUpload>
    </div>
  </div>
</template>

<script>
import BaseInput from '../../components/BaseInput'
import BaseTextarea from '../../components/BaseTextarea'
import BaseSelect from '../../components/BaseSelect'
import BaseRadio from '../../components/BaseRadio'
import BaseCheckbox from '../../components/BaseCheckbox'
import BaseUpload from '../../components/BaseUpload'

export default {
  name: 'ProductCustomOptions',
  components: {
    BaseInput,
    BaseTextarea,
    BaseSelect,
    BaseRadio,
    BaseCheckbox,
    BaseUpload,
  },
  props: {
    uploadAccept: {
      type: String,
      default: '*',
    },
    customOptions: {
      type: Array,
      required: true,
      default: () => [],
    },
    validations: {
      type: Object,
      default: () => {},
    },
    uploadProgress: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      optionValues: this.customOptions.reduce(
        (obj, item) =>
          Object.assign(obj, { [item.id]: this.optionValue(item) }),
        {}
      ),
    }
  },
  created() {
    this.$emit('change', this.optionValues)
  },
  methods: {
    optionValue(option) {
      const types = ['checkbox', 'radio', 'select']
      if (option && option.type && types.indexOf(option.type) !== -1) {
        return option.type === 'checkbox'
          ? [option.values[0].value]
          : option.values[0].value
      }
      if (option && option.type === 'file') {
        return null
      }
      return ''
    },
    onChange(id, value) {
      this.$set(this.optionValues, id, value)
      this.$emit('change', this.optionValues)
    },
  },
}
</script>
