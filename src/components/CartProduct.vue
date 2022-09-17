<template>
    <li class="cart__item product">
        <div class="product__pic">
            <img v-bind:src="item.product.image" width="120" height="120"
              v-bind:alt="item.product.title">
        </div>
        <h3 class="product__title">
            {{ item.product.title }}
        </h3>
       <span class="product__code">
            Артикул: {{ item.productId }}
        </span>

        <BaseCounter v-bind:amount="item.amount"
          v-on:change-amount="changeAmount($event, item.productId)"/>

        <b class="product__price">
            {{ (item.product.price * item.amount) | numberFormat }} ₽
        </b>

        <button class="product__del button-del" type="button"
          aria-label="Удалить товар из корзины"
            v-on:click.prevent="deleteProduct({ productId:item.productId })">
            <svg width="20" height="20" fill="currentColor">
                <use xlink:href="#icon-close"></use>
            </svg>
        </button>
    </li>
</template>

<script>
import BaseCounter from '@/components/BaseCounter.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';

export default {
  props: ['item'],
  filters: {
    numberFormat,
  },
  components: {
    BaseCounter,
  },
  methods: {
    ...mapActions({ deleteProduct: 'deleteProductFromCart' }),
    changeAmount(value, productId) {
      this.$store.dispatch('changeProductAmount', { productId, newAmount: value });
    },
  },
};
</script>
