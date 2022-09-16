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

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <li class="cart__item product" v-for="item in products" v-bind:key="item.product.id">
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

              <AmountCounter v-bind:amount="item.amount"
                v-on:change-amount="changeAmount($event, item.productId)"/>

              <b class="product__price">
                {{ (item.product.price * item.amount) | numberFormat }} ₽
              </b>

              <button class="product__del button-del" type="button"
                aria-label="Удалить товар из корзины">
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ cartTotalPrice | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import AmountCounter from '@/components/AmountCounter.vue';

export default {
  components: {
    AmountCounter,
  },
  filters: {
    numberFormat,
  },
  methods: {
    changeAmount(value, productId) {
      this.$store.dispatch('changeProductAmount', { productId, newAmount: value });
    },
  },
  computed: {
    ...mapGetters(['countProducts', 'cartTotalPrice']),
    ...mapGetters({ products: 'cartProductsDetails' }),
  },
};
</script>
