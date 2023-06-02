<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.image"
        width="120"
        height="120"
        :srcset="item.product.image2x"
        :alt="item.product.title"
      />
    </div>
    <h3 class="product__title">{{ item.product.title }}</h3>
    <span class="product__code"> Артикул: {{ item.product.id }} </span>

    <CartCounter :amount.sync="amount" />

    <b class="product__price"> {{ (item.amount * item.product.price) | numberFormat }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import CartCounter from '@/components/CartCounter.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';

export default {
  components: { CartCounter },
  filters: { numberFormat },
  props: ['item'],
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    ...mapActions(['removeCartFromProduct']),

    deleteProduct(productId) {
      this.removeCartFromProduct({ productId });
    },
  },
};
</script>

<style>
.form__btn,
.button-del {
  cursor: pointer;
}
</style>
