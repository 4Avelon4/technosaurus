<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <ProductInfo :products-count="countProducts" />
    </div>
    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterParams.priceFrom"
        :price-to.sync="filterParams.priceTo"
        :category-id.sync="filterParams.categoryId"
        :color-id.sync="filterParams.colorId"
        :page.sync="filterParams.page"
        :emit.sync="emit"
      />

      <section class="catalog">
        <LoadingInfo
          v-if="this.$store.state.product.productsLoading || this.$store.state.product.productsLoadingFailed"
          :condition-loading="this.$store.state.product.productsLoading"
          :condition-loading-failed="this.$store.state.product.productsLoadingFailed"
          :condition-reset="loadProducts"
          title-loading="Загрузка товаров..."
          title-failed="Произошла ошибка при загрузке товаров"
        />

        <ProductList :products="products" v-else-if="!this.$store.state.product.productsLoadingFailed" />
        <BasePagination :page.sync="filterParams.page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import { API_BASE_URL } from '@/config';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import ProductInfo from '@/components/ProductInfo.vue';
import axios from 'axios';
import { mapMutations } from 'vuex';
import LoadingInfo from '@/components/LoadingInfo.vue';
import deepEqual from '@/helpers/deepEqual';

export default {
  data() {
    return {
      filterParams: {
        priceFrom: +this.$route.query.priceFrom || '',
        priceTo: +this.$route.query.priceTo || '',
        categoryId: +this.$route.query.categoryId || 0,
        colorId: +this.$route.query.colorId || 0,
        page: +this.$route.query.page || 1,
      },

      productsPerPage: 6,
      productsData: null,

      emit: false,
      queryParams: {},

      filterParamsLoading: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
            ...product,
            image: product.image.file.url,
          }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    ...mapMutations(['productLoadingChecking', 'productLoadingFailedChecking']),

    loadProducts() {
      this.productsData = null;

      this.productLoadingChecking(true);
      this.productLoadingFailedChecking(false);

      clearTimeout(this.loadProductsTimer);

      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.filterParams.page,
              limit: this.productsPerPage,
              categoryId: this.filterParams.categoryId,
              colorId: this.filterParams.colorId,
              minPrice: this.filterParams.priceFrom,
              maxPrice: this.filterParams.priceTo,
            },
          })
          .then((response) => (this.productsData = response.data))
          .catch(() => {
            this.productLoadingFailedChecking(true);
          })
          .then(() => {
            this.productLoadingChecking(false);
          });
      }, 0);
    },
    toggleQueryParams(value, condition, queryName) {
      if (value !== condition && typeof value !== 'undefined') {
        Reflect.set(this.queryParams, queryName, String(value));
      }
    },
  },
  watch: {
    filterParams: {
      handler() {
        this.queryParams = {};

        this.queryParams.page = String(this.filterParams.page);
        this.toggleQueryParams(this.filterParams.priceFrom, '', 'priceFrom');
        this.toggleQueryParams(this.filterParams.priceTo, '', 'priceTo');
        this.toggleQueryParams(this.filterParams.categoryId, 0, 'categoryId');
        this.toggleQueryParams(this.filterParams.colorId, 0, 'colorId');

        if (!this.emit) {
          const areEqual = deepEqual(this.queryParams, this.$route.query);

          if (areEqual || this.queryParams.page === String(1)) {
            this.loadProducts();

            return;
          }
        }

        if (Object.keys(this.queryParams).length !== 1 || this.queryParams.page !== String(1)) {
          this.$router.push({
            query: {
              ...this.$route.query,
              ...this.queryParams,
            },
          });
        } else if (this.queryParams.page === String(1)) {
          this.queryParams = {};

          this.$router.push({
            query: {
              ...this.filterParams,
            },
          });

          this.$router.replace({ query: null });
        }

        this.filterParamsLoading = true;

        this.loadProducts();

        this.filterParamsLoading = false;
        this.emit = false;
      },

      deep: true,
    },
    '$route.fullPath': {
      handler() {
        const areEqual = deepEqual(this.queryParams, this.$route.query);

        if (areEqual) {
          return;
        }

        if (!this.filterParamsLoading) {
          this.filterParams.priceFrom = +this.$route.query.priceFrom || '';
          this.filterParams.priceTo = +this.$route.query.priceTo || '';
          this.filterParams.categoryId = +this.$route.query.categoryId || 0;
          this.filterParams.colorId = +this.$route.query.colorId || 0;
          this.filterParams.page = +this.$route.query.page || 1;

          this.loadProducts();
        }
      },

      immediate: true,
    },
  },
  created() {
    this.loadProducts();
  },
  components: { ProductList, BasePagination, ProductFilter, ProductInfo, LoadingInfo },
};
</script>

<style>
.catalog {
  position: relative;
}
</style>
