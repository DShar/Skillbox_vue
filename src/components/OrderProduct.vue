<template>
  <li class="cart__order">
    <h3>{{ item.product.title }}</h3>
    <b>{{ this.totalPrice | numberFormat }} ₽</b>
    <span>Артикул: {{ item.product.id }}</span>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['item'],
  filters: {
    numberFormat,
  },
  computed: {
    totalPrice() {
      return this.item.product.price * (this.item.amount || this.item.quantity);
    },
  },
};
</script>
