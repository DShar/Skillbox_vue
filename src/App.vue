<template>
  <component v-bind:is="currentPageComponent" v-bind:page-params="currentPageParams"
    v-on:gotoPage="(pageName, pageParams)=> gotoPage(pageName, pageParams)"/>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const routs = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  name: 'App',
  components: {
    MainPage,
    ProductPage,
    NotFoundPage,
  },

  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },

  methods: {
    gotoPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    },
  },

  computed: {
    currentPageComponent() {
      return routs[this.currentPage] || NotFoundPage;
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
