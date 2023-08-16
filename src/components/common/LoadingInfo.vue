<template>
  <div class="loading">
    <div v-if="conditionLoading" class="loading-info">{{ titleLoading }}</div>
    <ProductPreloader v-if="conditionLoading" />
    <div v-else-if="conditionLoadingFailed">
      <p class="reset--descr">{{ titleFailed }}</p>
      <button class="reset--button button button--second" @click.prevent="conditionReset">Попробовать ещё раз</button>
    </div>
  </div>
</template>

<script>
import ProductPreloader from '@/components/product/ProductPreloader.vue';

export default {
  props: ['conditionLoading', 'conditionLoadingFailed', 'conditionReset', 'titleLoading', 'titleFailed'],
  components: { ProductPreloader },
};
</script>

<style>
.loading {
  position: relative;
  min-width: 300px;
  min-height: 300px;
}

.loading-info {
  padding-top: 14px;
}

.reset--descr {
  display: inline-block;
  margin: 0;
  margin-right: 40px;
}

.reset--button {
  width: 250px;
  background-color: #000;
}
</style>
