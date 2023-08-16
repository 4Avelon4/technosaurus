<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Корзина </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <ProductInfo :products-count="productsCount" />
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <LoadingInfo
            v-if="this.$store.state.cart.cartLoading || this.$store.state.cart.cartLoadingFailed"
            :condition-loading="this.$store.state.cart.cartLoading"
            :condition-loading-failed="this.$store.state.cart.cartLoadingFailed"
            :condition-reset="loadCart"
            title-loading="Загрузка товаров..."
            title-failed="Произошла ошибка при загрузке товаров"
          />
          <ul class="cart__list" v-else-if="!this.$store.state.cart.cartLoadingFailed">
            <CartItem v-for="item in products" :key="item.productsId" :item="item" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <router-link
            class="cart__button button button--primery"
            type="submit"
            tag="button"
            :to="{ name: 'order' }"
            :disabled="!this.$store.state.cart.cartProducts.length"
          >
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapGetters, mapActions } from 'vuex';
import CartItem from '@/components/cart/CartItem.vue';
import declensionProducts from '@/helpers/declensionProducts';
import ProductInfo from '@/components/product/ProductInfo.vue';
import LoadingInfo from '@/components/common/LoadingInfo.vue';

export default {
  data() {
    return {
      productsData: null,
    };
  },
  filters: { numberFormat },
  components: { CartItem, ProductInfo, LoadingInfo },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: `cartTotalPrice`, productsCount: `cartProductsCount` }),
  },
  methods: {
    ...mapActions(['loadCart']),

    cartNumber(value) {
      return `${value} ${declensionProducts(value)}`;
    },
  },
  created() {
    this.loadCart();
  },
};
</script>

<style>
.cart__list {
  position: relative;
  min-height: 300px;
}
</style>
