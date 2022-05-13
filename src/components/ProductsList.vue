<template>
    <ul class="catalog__list">
          <li class="catalog__item" v-for="(product,index) in products" v-bind:key="index">
            <ProductItem v-bind:product="product"/>
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
