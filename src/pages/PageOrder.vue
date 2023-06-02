<template>
  <LoadingInfo
    class="content container"
    v-if="this.$store.state.cart.cartLoading || this.$store.state.cart.cartLoadingFailed"
    :condition-loading="this.$store.state.cart.cartLoading"
    :condition-loading-failed="this.$store.state.cart.cartLoadingFailed"
    :condition-reset="loadCart"
    title-loading="Загрузка товаров..."
    title-failed="Произошла ошибка при загрузке товаров"
  />
  <main class="content container" v-else-if="!this.$store.state.cart.cartLoadingFailed">
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

      <h1 class="content__title">Корзина</h1>
      <ProductInfo :products-count="productsCount" />
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              v-model="formData.name"
              :error="formError.name"
              title="ФИО"
              placeholder="Введите ваше полное имя"
            />

            <BaseFormText
              v-model="formData.address"
              :error="formError.address"
              title="Адрес доставки"
              placeholder="Введите ваш адрес"
            />

            <BaseFormText
              v-model="formData.phone"
              :error="formError.phone"
              title="Телефон"
              type="tel"
              placeholder="Введите ваш телефон"
            />

            <BaseFormText
              v-model="formData.email"
              :error="formError.email"
              title="Email"
              type="email"
              placeholder="Введите ваш Email"
            />

            <BaseFormTextarea
              v-model="formData.comment"
              :error="formError.comment"
              title="Комментарий к заказу"
              placeholder="Ваши пожелания"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="" />
                  <span class="options__value"> Самовывоз <b>бесплатно</b> </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500" />
                  <span class="options__value"> Курьером <b>500 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card" />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash" />
                  <span class="options__value"> Наличными при получении </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <OrderProduct :products="products" :products-count="productsCount" :total-price="this.totalPrice" />

          <button
            class="cart__button button button--primery"
            type="submit"
            v-show="this.$store.state.cart.cartProducts.length"
          >
            Оформить заказ
          </button>
        </div>

        <div class="cart__error form__error-block" v-show="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>{{ formErrorMessage }}</p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { API_BASE_URL } from '@/config';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import axios from 'axios';
import { mapMutations, mapGetters, mapActions } from 'vuex';
import ProductInfo from '@/components/ProductInfo.vue';
import OrderProduct from '@/components/OrderProduct.vue';
import LoadingInfo from '@/components/LoadingInfo.vue';

export default {
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
    };
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: `cartTotalPrice`,
      productsCount: `cartProductsCount`,
    }),
  },
  methods: {
    ...mapMutations(['productLoadingChecking', 'productLoadingFailedChecking', 'resetCart', 'updateOrderInfo']),
    ...mapActions(['loadCart']),

    order() {
      this.formError = {};
      this.formErrorMessage = '';

      this.productLoadingChecking(true);
      this.productLoadingFailedChecking(false);

      clearTimeout(this.loadProductsTimer);

      this.loadProductsTimer = setTimeout(() => {
        axios
          .post(
            `${API_BASE_URL}/api/orders`,
            {
              ...this.formData,
            },
            {
              params: {
                userAccessKey: this.$store.state.cart.userAccessKey,
              },
            }
          )
          .then((response) => {
            this.resetCart();
            this.updateOrderInfo(response.data);
            this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
          })
          .catch((error) => {
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message;
            this.productLoadingFailedChecking(true);
          })
          .then(() => {
            this.productLoadingChecking(false);
          });
      }, 0);
    },
  },
  components: { BaseFormText, BaseFormTextarea, ProductInfo, OrderProduct, LoadingInfo },
};
</script>

<style>
.total__info {
  font-weight: normal;
  color: #fff;
}
</style>
