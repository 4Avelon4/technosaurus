<template>
  <LoadingInfo
    class="content container"
    v-if="this.$store.state.order.orderLoading || this.$store.state.order.orderLoadingFailed"
    :condition-loading="this.$store.state.order.orderLoading"
    :condition-loading-failed="this.$store.state.order.orderLoadingFailed"
    :condition-reset="this.loadOrderInfo(this.$route.params.id)"
    title-loading="Загрузка информации о заказе..."
    title-failed="Не удалось загрузить информацию о заказе"
  />
  <main class="content container" v-else-if="!this.$store.state.order.orderLoadingFailed">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }"> Корзина </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа. Наши
            менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key"> Получатель </span>
              <span class="dictionary__value"> {{ orderInfo.name }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Адрес доставки </span>
              <span class="dictionary__value"> {{ orderInfo.address }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Телефон </span>
              <span class="dictionary__value"> {{ orderInfo.phone }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Email </span>
              <span class="dictionary__value"> {{ orderInfo.email }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Способ оплаты </span>
              <span class="dictionary__value"> картой при получении </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <OrderProduct :products="products" :products-count="productsCount" :total-price="totalPrice" />
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import OrderProduct from '@/components/order/OrderProduct.vue';
import LoadingInfo from '@/components/common/LoadingInfo.vue';

export default {
  methods: {
    ...mapActions(['loadOrderInfo']),
  },
  computed: {
    orderInfo() {
      return this.$store.state.order.orderInfo || {};
    },

    products() {
      return this.orderInfo.basket.items;
    },

    productsCount() {
      return this.products.reduce((acc, item) => item.quantity + acc, 0);
    },

    totalPrice() {
      return this.products.reduce((acc, item) => item.price * item.quantity + acc, 0);
    },
  },
  created() {
    if (this.$store.state.order.orderInfo && this.$store.state.order.orderInfo.id === this.$route.params.id) {
      return;
    }

    this.loadOrderInfo(this.$route.params.id);
  },
  components: { OrderProduct, LoadingInfo },
};
</script>
