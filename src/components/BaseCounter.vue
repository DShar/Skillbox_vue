<template>
    <div class="form__counter">
        <button type="button" aria-label="Убрать один товар"
          v-on:click.prevent="currentAmount--">
            <svg width="12" height="12" fill="currentColor">
                <use xlink:href="#icon-minus"></use>
            </svg>
        </button>

        <input type="text" v-model.number="currentAmount" name="count">

        <button type="button" aria-label="Добавить один товар"
          v-on:click.prevent="currentAmount++">
            <svg width="12" height="12" fill="currentColor">
                <use xlink:href="#icon-plus"></use>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
  props: ['amount'],
  computed: {
    currentAmount: {
      get() {
        return this.amount;
      },
      set(value) {
        if (value > 0) {
          this.changeAmount(value);
        }
      },
    },
  },
  methods: {
    changeAmount(value) {
      this.$emit('change-amount', value);
    },
  },
};
</script>
