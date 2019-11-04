<template>
  <div :class="['quantity-control__quantity', { disabled: disable }]">
    <input
      type="number"
      :min="min"
      :max="max"
      inputmode="numeric"
      pattern="[0-9]*"
      class="qty-input pl16"
      :value="internalValue"
      @input="inputValue"
      @blur="blurValue"
    />
    <button
      class="qty-input__increase brdr-left-1 brdr-bottom-1 brdr-cl-whisper"
      :disabled="internalValue === max || disable"
      @keydown.enter="changeQuantity(1)"
      @click="changeQuantity(1)"
    >
      <span class="qty-input__up"> </span>
    </button>
    <button
      class="qty-input__decrease brdr-left-1 brdr-cl-whisper"
      :disabled="internalValue === min || disable"
      @keydown.enter="changeQuantity(-1)"
      @click="changeQuantity(-1)"
    >
      <span class="qty-input__down"> </span>
    </button>
  </div>
</template>

<script>
import { Quantity } from '../mixins/Quantity'
export default {
  name: 'QuantityControl',
  mixins: [Quantity],
}
</script>
