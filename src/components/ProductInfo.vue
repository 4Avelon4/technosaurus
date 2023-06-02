<template>
  <span class="content__info">{{ productsNumber(productsCount) }}</span>
</template>

<script>
import declensionProducts from '@/helpers/declensionProducts';

export default {
  props: ['productsCount'],
  methods: {
    productsNumber(value) {
      return `${value} ${declensionProducts(value)}`;
    },
  },
};
</script>
