<template>
  <div :class="['quantity', { disabled: disable }]">
    <button
      type="button"
      class="quantity__adjust quantity__adjust--minus"
      :disabled="disable"
      @click="changeQuantity(-1)"
    >
      <svg class="quantity__icon svg-14">
        <use xlink:href="#ic_remove_24px"></use>
      </svg>
      <span class="fallback-text" aria-hidden="true">&minus;</span>
    </button>
    <input
      type="number"
      class="quantity__num"
      :min="min"
      :max="max"
      :value="internalValue"
      @input="inputValue"
      @blur="blurValue"
    />
    <button
      type="button"
      class="quantity__adjust quantity__adjust--plus"
      :disabled="disable"
      @click="changeQuantity(1)"
    >
      <svg class="quantity__icon svg-14">
        <use xlink:href="#ic_add_24px"></use>
      </svg>
      <span class="fallback-text" aria-hidden="true">+</span>
    </button>
  </div>
</template>

<script>
import { Quantity } from '../mixins/Quantity'
export default {
  name: 'Quantity',
  mixins: [Quantity],
}
</script>
