import productMutations from './productMutations';
import productActions from './productActions';
import productGetters from './productGetters';

export default {
  state: {
    productsData: null,

    productsLoading: false,
    productsLoadingFailed: false,

    productAdded: false,
    productAddSending: false,
  },
  getters: productGetters,
  mutations: productMutations,
  actions: productActions,
};
