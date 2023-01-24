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
      return axios
        .post(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        },
        {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    changeProductAmount(context, { productId, newAmount }) {
      context.commit('changeProductAmount', { productId, newAmount });

      if (newAmount < 1) {
        return {};
      }

      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: newAmount,
        },
        {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteProductFromCart(context, { productId }) {
      context.commit('deleteProduct', { productId });

      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
          data: { productId },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
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
