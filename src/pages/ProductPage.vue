<template>
  <main class="content container" v-if="productData">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" v-bind:to="{name:'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" v-bind:to="{name:'main'}">
            {{category.title}}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{product.title}}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570px" height="570px" v-bind:src="product.image"
            v-bind:alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{product.id}}</span>
        <h2 class="item__title">
          {{product.title}}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" v-on:submit.prevent="addToCart">
            <b class="item__price">
              {{product.price | numberFormat}} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in product.colors" v-bind:key="color.id">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" v-bind:value="color.id">
                    <span class="colors__value" v-bind:style="{'background-color': color.code}">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128"
                      checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <BaseCounter v-bind:amount="amount" v-on:change-amount="changeAmount($event)"/>

              <button class="button button--primery" type="submit" v-bind:disabled="productSending">
                В корзину
              </button>
            </div>
            <span v-show="productAdded">
              Товар добавлен в корзину
            </span>
            <span v-show="productSending">
              Идёт добавление товара в корзину...
            </span>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS - это велокомпьютер, который позволяет оптимизировать
            свои велотренировки,
            сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется
            с датчиками по ANT+,
            объединяя полученную с них информацию. Данные отображаются на дисплее,
            а также сохраняются на смартфоне.
            При этом на мобильное устройство можно установить как фирменное приложение,
            так и различные приложения сторонних разработчиков.
            Велокомпьютер точно отслеживает местоположение, принимая сигнал
            с целого комплекса спутников.
            Эта информация позволяет смотреть уже преодоленные маршруты и
            планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный.
            Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм.
            что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика.
            На обращенной к пользователю стороне расположен дисплей диагональю 56 мм.
            На дисплей выводятся координаты и скорость, а также полученная со смартфона
            и синхронизированных датчиков информация: интенсивность, скорость вращения педалей,
            пульс и т.д. (датчики не входят в комплект поставки).
            Корпус велокомпьютера имеет степень защиты от влаги IPX7.
            Это означает, что устройство не боится пыли, а также выдерживает кратковременное
            (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
  <main v-else-if="productLoading" class="loader">
  </main>
  <main v-else-if="productLoadingError" class="content__title">
    Ошибка при загрузке товара
    <a class="error__link" href="#" v-on:click.prevent="loadProduct">Попробовать ещё раз</a>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import gotoPage from '@/helpers/gotopage';
import BaseCounter from '@/components/BaseCounter.vue';
import { API_BASE_URL } from '@/config';
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      amount: 1,

      productData: null,
      productLoading: false,
      productLoadingError: false,

      productAdded: false,
      productSending: false,
    };
  },
  components: {
    BaseCounter,
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return {
        ...this.productData,
        image: this.productData.image.file.url,
      };
    },
    category() {
      return this.productData.category;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    gotoPage,
    addToCart() {
      this.productSending = true;

      this.addProductToCart({ productId: this.product.id, amount: this.amount })
        .then(() => {
          this.productAdded = true;
        })
        .finally(() => {
          this.productSending = false;
        });
    },
    changeAmount(value) {
      this.amount = value;
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingError = false;

      return axios
        .get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => { this.productData = response.data; })
        .catch(() => { this.productLoadingError = true; })
        .finally(() => { this.productLoading = false; });
    },
  },
  watch: {
    'this.$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
