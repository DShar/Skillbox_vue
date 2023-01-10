import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],

    cartProductsData: [],
    userAccessKey: null,

    cartProductsLoading: false,
  },
  getters: {
    countProducts(state) {
      return state.cartProducts.length;
    },
    cartProductsDetails(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => (p.product.id === item.productId));
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
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

      if (item) {
        item.amount = newAmount;
      }
    },
    deleteProduct(state, { productId }) {
      state.cartProducts = state.cartProducts.filter((product) => product.productId !== productId);
    },

    updateUserAccessKey(state, key) {
      state.userAccessKey = key;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
    setCartProductsLoading(state, value) {
      state.cartProductsLoading = value;
    },
  },
  actions: {
    addProductToCart(context, { productId, amount }) {
      context.commit('addProduct', { productId, amount });
    },
    changeProductAmount(context, { productId, newAmount }) {
      context.commit('changeProductAmount', { productId, newAmount });
    },
    deleteProductFromCart(context, { productId }) {
      context.commit('deleteProduct', { productId });
    },
    setUserAccessKey(context, accessKey) {
      context.commit('updateUserAccessKey', accessKey);
    },
    loadCart(context) {
      context.commit('setCartProductsLoading', true);

      axios
        .get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
        .finally(() => {
          context.commit('setCartProductsLoading', false);
        });

    },
  },
});
