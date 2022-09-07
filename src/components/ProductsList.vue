<template>
    <ul class="catalog__list">
      <li class="catalog__item" v-for="product in products" v-bind:key="product.id">
        <ProductItem v-bind:product="product"
          v-on:gotoPage="(pageName, pageParams)=> $emit('gotoPage', pageName, pageParams)"/>
      </li>
    </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: ['products'],
  components: {
    ProductItem,
  },
};
</script>

<style lang="stylus">

</style>
