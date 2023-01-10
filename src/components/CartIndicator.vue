<template>
    <router-link class="header__cart" v-bind:to="{name: 'cart'}" aria-label="Корзина с товарами">
          <svg width="30" height="21" fill="currentColor">
            <use xlink:href="#icon-cart"></use>
          </svg>
          <span v-if="$store.state.cartProductsLoading" class="loader loader__small">
          </span>
          <span v-else class="header__count" aria-label="Количество товаров">
            {{ $store.getters.countProducts }}
          </span>
    </router-link>
</template>

<script>
export default {

};
</script>
