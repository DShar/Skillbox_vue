<template>
    <div>
        <router-link class="catalog__pic" v-bind:to="{name:'product', params: { id: product.id }}">
          <img v-bind:src="product.image" alt="Название товара">
        </router-link>

        <h3 class="catalog__title">
          <router-link v-bind:to="{name:'product', params: { id: product.id }}">
            {{product.title}}
          </router-link>
        </h3>

        <span class="catalog__price">
          {{product.price | numberFormat}} ₽
        </span>

        <ul class="colors colors--black">
          <li class="colors__item" v-for="color in product.colors" v-bind:key="color">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" v-bind:value="color">
              <span class="colors__value" v-bind:style="{'background-color': color}">
              </span>
            </label>
          </li>
        </ul>
    </div>
</template>

<script>
import gotoPage from '@/helpers/gotopage';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
    };
  },
  props: ['product'],
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage,
  },
};
</script>

<style lang="stylus">

</style>
