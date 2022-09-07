<template>
    <div>
            <a class="catalog__pic" href="#"
              v-on:click.prevent="$emit('gotoPage','product', product.id)">
              <img v-bind:src="product.image" alt="Название товара">
            </a>

            <h3 class="catalog__title">
              <a href="#">
                {{product.title}}
              </a>
            </h3>

            <span class="catalog__price">
              {{product.price}} ₽
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
export default {
  data() {
    return {
    };
  },
  props: ['product'],
};
</script>

<style lang="stylus">

</style>
