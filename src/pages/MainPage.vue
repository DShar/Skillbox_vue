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
        v-bind:colorValue.sync="filterColorValue"
      />
      <section class="catalog">
        <ProductsList v-bind:products="products"/>
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
import products from '@/data/products';
import ProductsList from '@/components/ProductsList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';

export default {
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
      filterColorValue: 0,

      page: 1,
      productsPerPage: 4,

      productsData: null,
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

      if (this.filterColorValue !== 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.colors && product.colors.includes(this.filterColorValue),
        );
      }

      return filteredProducts;
    },
    products() {
      // const offset = (this.page - 1) * this.productsPerPage;
      // return this.filteredProducts.slice(offset, offset + this.productsPerPage);
      return this.productsData ? this.productsData.items.map((product) => ({
        ...product,
        image: product.image.file.url,
      })) : [];
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
  methods: {
    loadProducts() {
      axios
        .get('https://vue-study.skillbox.cc/api/products?page=1&limit=5')
        .then((response) => { this.productsData = response.data; });
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
