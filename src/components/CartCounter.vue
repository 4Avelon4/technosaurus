<template>
  <div class="form__counter">
    <button
      class="form__btn form__btn--incr"
      type="button"
      aria-label="Убрать один товар"
      @click.prevent="increaseCart()"
    >
      <svg class="form__btn-icon" width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <label for="addToCart">
      <input
        class="form__input"
        id="addToCart"
        type="number"
        v-model.number="amountValue"
        @input.prevent="inputCart()"
      />
    </label>

    <button
      class="form__btn form__btn--decr"
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="decreaseCart()"
    >
      <svg class="form__btn-icon" width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amountValue: this.amount || 1,
    };
  },
  props: ['amount'],
  methods: {
    inputCart() {
      const status = this.amountValue instanceof Number || this.amountValue >= 1;

      if (status) {
        this.$emit('update:amount', this.amountValue);
      } else {
        this.amountValue = '';
      }
    },
    increaseCart() {
      if (this.amountValue > 1) {
        this.$emit('update:amount', --this.amountValue);
      }
    },
    decreaseCart() {
      this.$emit('update:amount', ++this.amountValue);
    },
  },
};
</script>

<style>
.form__input::-webkit-outer-spin-button,
.form__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.form__input[type='number'] {
  -moz-appearance: textfield;
}
</style>
