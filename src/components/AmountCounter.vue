<template>
    <div class="form__counter">
        <button type="button" aria-label="Убрать один товар" v-on:click.prevent="decreaseAmount">
            <svg width="12" height="12" fill="currentColor">
                <use xlink:href="#icon-minus"></use>
            </svg>
        </button>

        <input type="text" v-model.number="amount" name="count">

        <button type="button" aria-label="Добавить один товар" v-on:click.prevent="increaseAmount">
            <svg width="12" height="12" fill="currentColor">
                <use xlink:href="#icon-plus"></use>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
  props: ['amount'],
  methods: {
    changeAmount(value) {
      this.$emit('change-amount', value);
    },
    increaseAmount() {
      this.changeAmount(this.amount + 1);
    },
    decreaseAmount() {
      if (this.amount > 1) {
        this.changeAmount(this.amount - 1);
      }
    },

  },
};
</script>
