<template>
    <section class="catalog">
      <ProductsList v-bind:products="products"/>
      <BasePagination v-bind:count="countProducts" v-model="page"
        v-bind:per-page="productsPerPage"/>
      </section>
</template>

<script>
import products from './data/products';
import ProductsList from './components/ProductsList.vue';
import BasePagination from './components/BasePagination.vue';

export default {
  name: 'App',
  components: {
    ProductsList,
    BasePagination,
  },
  data() {
    return {
      page: 1,
      productsPerPage: 4,
    };
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return products.length;
    },
  },
};
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
