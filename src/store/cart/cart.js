import cartMutations from './cartMutations';
import cartGetters from './cartGetters';
import cartActions from './cartActions';

export default {
  state: {
    userAccessKey: null,

    cartProducts: [],
    cartProductsData: [],

    cartLoading: false,
    cartLoadingFailed: false,
  },
  mutations: cartMutations,
  getters: cartGetters,
  actions: cartActions,
};
