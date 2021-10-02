import { reactive } from "vue";

const state = reactive({
  user: null,
});

const methods = {
  setUser(payload) {
    state.user = payload ? payload.user : null;
  },
};

export default {
  state,
  methods,
};
