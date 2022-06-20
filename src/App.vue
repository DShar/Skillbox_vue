<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        v-bind:priceFrom.sync="filterPriceFrom"
        v-bind:priceTo.sync="filterPriceTo"
        v-bind:categoryId.sync="filterCategoryId"
      />
      <section class="catalog">
        <ProductsList v-bind:products="products" />
        <BasePagination
          v-bind:count="countProducts"
          v-model="page"
          v-bind:per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import products from './data/products';
import ProductsList from './components/ProductsList.vue';
import BasePagination from './components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
  components: {
    ProductsList,
    BasePagination,
    ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,

      page: 1,
      productsPerPage: 4,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > this.filterPriceFrom,
        );
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price < this.filterPriceTo,
        );
      }

      if (this.filterCategoryId > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === this.filterCategoryId,
        );
      }

      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>

<style lang="stylus">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
