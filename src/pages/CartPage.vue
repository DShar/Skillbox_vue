<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        Товаров: {{ countProducts }}
      </span>
    </div>

    <section v-if="cartProductsLoading" class="loader">
    </section>

    <section v-else class="cart">
      <p v-show="!cartProductsDetails.length">
        <i>Добавьте товары в корзину</i>
      </p>
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartProduct v-for="item in cartProductsDetails" v-bind:key="item.productId"
              v-bind:item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ cartTotalPrice | numberFormat }} ₽</span>
          </p>

          <router-link v-show="countProducts" tag="button" v-bind:to="{name: 'order'}"
            class="cart__button button button--primery" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import CartProduct from '@/components/CartProduct.vue';

export default {
  components: {
    CartProduct,
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters(['countProducts', 'cartTotalPrice', 'cartProductsDetails']),

    ...mapState({
      cartProductsLoading: (state) => (state.cartProductsLoading),
    }),
  },
};
</script>
