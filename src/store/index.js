import { createStore } from 'vuex'

export default createStore({
  state: {
    showInvoiceModal: false,
    showLeaveModal: false,
  },
  mutations: {
    toggleInvoiceModal(state) {
      state.showInvoiceModal = !state.showInvoiceModal;
    },
    toggleLeaveModal(state) {
      state.showLeaveModal = !state.showLeaveModal;
    }
  },
  actions: {
    toggleInvoiceModal(context) {
      context.commit("toggleInvoiceModal");
    },
    toggleLeaveModal(context) {
      context.commit("toggleLeaveModal");
    }
  },
  modules: {
  },
  getters: {
    showInvoiceModal: state => state.showInvoiceModal,
    showLeaveModal: state => state.showLeaveModal,
  }
})
