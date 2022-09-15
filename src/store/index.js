import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
  },
  getters: {
    countProducts(state) {
      return state.cartProducts.length;
    },
  },
  mutations: {
    addProduct(state, payload) {
      const item = state.cartProducts.find((product) => product.productId === payload.productId);

      if (item) {
        item.amount += payload.amount;
      } else {
        state.cartProducts.push({
          productId: payload.productId,
          amount: payload.amount,
        });
      }
    },
  },
  actions: {
    addProductToCart(context, { productId, amount }) {
      context.commit('addProduct', { productId, amount });
    },
  },
});
