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
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ 23621</span>
      </h1>
    </div>

    <div class="loader" v-if="orderInfoLoading"></div>
    <section class="cart" v-else>
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо
            с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;
            Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <BaseFormInfoField title="Получатель" v-bind:value="orderInfo.name"/>
            <BaseFormInfoField title="Адрес доставки" v-bind:value="orderInfo.address"/>
            <BaseFormInfoField title="Телефон" v-bind:value="orderInfo.phone"/>
            <BaseFormInfoField title="Email" v-bind:value="orderInfo.email"/>
            <BaseFormInfoField title="Способ оплаты" value="картой при получении"/>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders" v-if="orderInfo.basket">
            <OrderProduct v-for="item in orderInfo.basket.items"  v-bind:key="item.product.id"
              v-bind:item="item"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ productsAmount }}</b> товара на сумму
            <b>{{ orderInfo.totalPrice }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import OrderProduct from '@/components/OrderProduct.vue';
import BaseFormInfoField from '@/components/BaseFormInfoField.vue';

export default {
  data() {
    return {
      orderInfoLoading: false,
    };
  },
  created() {
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
      return;
    }

    this.orderInfoLoading = true;

    this.$store.dispatch('loadOrderInfo', this.$route.params.id)
      .finally(() => {
        this.orderInfoLoading = false;
      });
  },
  components: {
    OrderProduct,
    BaseFormInfoField,
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapState({
      orderInfo: (state) => (state.orderInfo ? state.orderInfo : {}),
      orderLoading: (state) => (state.orderInfoLoading),
    }),
    productsAmount() {
      if (!this.orderInfo.basket) {
        return {};
      }

      return this.orderInfo.basket.items.length;
    },
  },
};
</script>
