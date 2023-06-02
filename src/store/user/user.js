export default {
  state: {
    userAccessKey: null,
  },
  mutations: {
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
  },
};
