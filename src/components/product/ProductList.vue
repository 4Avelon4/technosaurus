<template>
  <div>
    <div class="form__block">
      <legend class="form__legend">Элементов на странице</legend>
      <!-- <p>Элементов на странице</p> -->
      <label class="form__label form__label--select form__label--page">
        <select
          class="form__select form__select--page"
          type="text"
          name="category"
          v-model.number="currentProductsPerPage"
          @change="onChangeSelect"
        >
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="9">9</option>
          <option value="12">12</option>
        </select>
      </label>
    </div>
    <ul class="catalog__list">
      <ProductItem v-for="product in products" :key="product.id" :product="product" />
    </ul>
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  data() {
    return {
      currentProductsPerPage: this.productsPerPage || 6,
    };
  },
  props: ['products', 'productsPerPage'],
  watch: {
    productsPerPage(value) {
      this.currentProductsPerPage = value;
    },
  },
  methods: {
    onChangeSelect() {
      this.$emit('update:productsPerPage', this.currentProductsPerPage);
    },
  },
  components: { ProductItem },
};
</script>

<style>
.form__label--page {
  max-width: 80px;
}
</style>
