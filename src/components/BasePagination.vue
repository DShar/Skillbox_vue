<template>
    <ul class="catalog__pagination pagination">
          <li class="pagination__item">
            <a class="pagination__link pagination__link--arrow" href="#"
            :class="{'pagination__link--disabled' : page === 1}"
            aria-label="Предыдущая страница" v-on:click.prevent="paginatePrev()">
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
            </a>
          </li>
          <li class="pagination__item" v-for="pageNumber in countPages" v-bind:key="pageNumber">
            <a class="pagination__link"
                v-bind:class="{'pagination__link--current' : pageNumber === page}" href="#"
                v-on:click.prevent="paginate(pageNumber)">
              {{ pageNumber }}
            </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link pagination__link--arrow" href="#"
            :class="{'pagination__link--disabled' : page === this.countPages}"
            aria-label="Следующая страница" v-on:click.prevent="paginateNext()">
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </a>
          </li>
        </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['count', 'page', 'perPage'],
  methods: {
    paginate(number) {
      this.$emit('paginate', number);
    },
    paginatePrev() {
      if (this.page > 1) {
        this.paginate(this.page - 1);
      }
    },
    paginateNext() {
      if (this.page < this.countPages) {
        this.paginate(this.page + 1);
      }
    },
  },
  computed: {
    countPages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
};
</script>
