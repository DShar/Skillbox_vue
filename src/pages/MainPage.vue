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
        <div v-if="productsLoadingFailed" class="content__title">
          Ошибка при загрузке каталога
          <a class="error__link" href="#" v-on:click.prevent="loadProducts">Попробовать ещё раз</a>
        </div>
        <div v-if="productsLoading" class="loader"></div>

        <ProductsList v-else v-bind:products="products"/>
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
import ProductsList from '@/components/ProductsList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

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
      productsPerPage: 3,

      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData ? this.productsData.items.map((product) => ({
        ...product,
        image: product.image.file.url,
        colors: product.colors.map((color) => color.code),
      })) : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;

      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColorValue,
            },
          })
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.productsLoadingFailed = true; })
          .finally(() => { this.productsLoading = false; });
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterColorValue() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
