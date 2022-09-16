import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
  },
  getters: {
    countProducts(state) {
      return state.cartProducts.length;
    },
    cartProductsDetails(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((product) => product.id === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartProductsDetails.reduce((acc, item) => acc
        + item.product.price * item.amount, 0);
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
    changeProductAmount(state, { productId, newAmount }) {
      const item = state.cartProducts.find((product) => product.productId === productId);

      item.amount = newAmount;
    },
  },
  actions: {
    addProductToCart(context, { productId, amount }) {
      context.commit('addProduct', { productId, amount });
    },
    changeProductAmount(context, { productId, newAmount }) {
      context.commit('changeProductAmount', { productId, newAmount });
    },
  },
});
