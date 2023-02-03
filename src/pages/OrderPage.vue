<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" v-bind:to="{name:'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" v-bind:to="{name:'cart'}">
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
        Корзина
      </h1>
      <span class="content__info">
        Товаров: {{ countProducts }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="loader" style="position: absolute; left:50% " v-if="formOrderLoading"></div>
          <div class="cart__data">
            <BaseFormText title="ФИО" v-bind:error="formError.name"
              v-model="formData.name" placeholder="Введите ваше полное имя"/>

            <BaseFormText title="Адрес доставки" v-bind:error="formError.address"
              v-model="formData.address" placeholder="Введите ваш адрес"/>

            <BaseFormText title="Телефон" v-bind:error="formError.phone"
              v-model="formData.phone" placeholder="Введите ваш телефон" type="tel"/>

            <BaseFormText title="Email" v-bind:error="formError.email"
              v-model="formData.email" placeholder="Введите ваш Email" type="email"/>

            <BaseFormTextarea title="Комментарий к заказу" v-model="formData.comment"
              v-bind:error="formError.comment" placeholder="Ваши пожелания"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery"
                    value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderProduct v-for="item in cartProductsDetails" v-bind:key="item.productId"
              v-bind:item="item"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ countProducts }}</b> товара на сумму <b>
              {{ cartTotalPrice | numberFormat }} ₽</b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import OrderProduct from '@/components/OrderProduct.vue';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  components: {
    BaseFormText,
    BaseFormTextarea,
    OrderProduct,
  },
  filters: {
    numberFormat,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',

      formOrderLoading: false,
    };
  },
  computed: {
    ...mapGetters(['countProducts', 'cartTotalPrice', 'cartProductsDetails']),
  },
  methods: {
    ...mapActions(['resetCart', 'updateOrderInfo']),
    order() {
      this.formError = {};
      this.formOrderLoading = true;

      return axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...this.formData,
        },
        {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((response) => {
          this.updateOrderInfo(response.data);
          this.resetCart();
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        })
        .finally(() => {
          this.formOrderLoading = false;
        });
    },
  },
};
</script>
