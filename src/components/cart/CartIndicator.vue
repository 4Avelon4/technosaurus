<template>
  <router-link class="header__cart" aria-label="Корзина с товарами" :to="{ name: 'cart' }">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <ProductPreloader class="preloader__indicator" v-if="loadIf" />
    <span class="header__count" aria-label="Количество товаров" v-else>{{ productsCount }}</span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductPreloader from '@/components/product/ProductPreloader.vue';

export default {
  components: { ProductPreloader },
  computed: {
    ...mapGetters({ productsCount: `cartProductsCount` }),

    loadIf() {
      return (
        this.$store.state.product.productAddSending ||
        (this.$route.fullPath === '/cart' && this.$store.state.product.productsLoading)
      );
    },
  },
};
</script>

<style>
.preloader__indicator {
  position: absolute;
  top: -10px;
  left: 25px;
}

.preloader__indicator.loader {
  width: 20px;
  height: 20px;
}

.preloader__indicator.loader::before {
  border: 5px solid #9eff00;
}
</style>
