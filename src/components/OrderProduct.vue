<template>
  <div>
    <ul class="cart__orders" v-show="this.products.length">
      <OrderItem v-for="item in products" :key="item.productsId" :item="item" />
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p v-if="this.products.length">
        Итого: <ProductInfo class="total__info" :products-count="productsCount" /> на сумму
        <b>{{ this.totalPrice | numberFormat }} ₽</b>
      </p>
      <p v-else>Товары отсутствуют в корзине.</p>
    </div>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import OrderItem from '@/components/OrderItem.vue';
import ProductInfo from '@/components/ProductInfo.vue';

export default {
  filters: { numberFormat },
  props: ['products', 'productsCount', 'totalPrice'],
  components: { OrderItem, ProductInfo },
};
</script>
