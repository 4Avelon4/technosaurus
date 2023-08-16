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
import ProductList from '@/components/product/ProductList.vue';
import BasePagination from '@/components/base/BasePagination.vue';
import ProductFilter from '@/components/product/ProductFilter.vue';
import ProductInfo from '@/components/product/ProductInfo.vue';
import { mapActions, mapGetters } from 'vuex';
import LoadingInfo from '@/components/common/LoadingInfo.vue';
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

      emit: false,
      queryParams: {},

      filterParamsLoading: false,
    };
  },
  computed: {
    ...mapGetters(['detailProducts']),

    products() {
      return this.detailProducts
        ? this.detailProducts.items.map((product) => ({
            ...product,
            image: product.image.file.url,
          }))
        : [];
    },
    countProducts() {
      return this.detailProducts ? this.detailProducts.pagination.total : 0;
    },
  },
  methods: {
    ...mapActions(['loadProducts']),

    loading() {
      this.loadProducts({
        productsPerPage: this.productsPerPage,
        filterParams: this.filterParams,
      });
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
            this.loading();

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

        this.loading();

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

          this.loading();
        }
      },

      immediate: true,
    },
  },
  created() {
    this.loading();
  },
  components: { ProductList, BasePagination, ProductFilter, ProductInfo, LoadingInfo },
};
</script>

<style>
.catalog {
  position: relative;
}
</style>
