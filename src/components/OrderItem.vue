<template>
  <li class="cart__order">
    <h3>{{ item.product.title }}</h3>
    <b>{{ (quantity * item.product.price) | numberFormat }} ₽</b>
    <span>Артикул: {{ item.product.id }}</span>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  filters: { numberFormat },
  props: ['item'],
  computed: {
    quantity() {
      if (this.item.quantity) {
        return this.item.quantity;
      }
      return this.amount;
    },
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
};
</script>
