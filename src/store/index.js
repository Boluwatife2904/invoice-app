import { createStore } from 'vuex'

export default createStore({
  state: {
    showInvoiceModal: false
  },
  mutations: {
    toggleInvoiceModal(state) {
      state.showInvoiceModal = !state.showInvoiceModal;
    }
  },
  actions: {
    toggleInvoiceModal(context) {
      context.commit("toggleInvoiceModal")
    }
  },
  modules: {
  },
  getters: {
    showInvoiceModal: state => state.showInvoiceModal,
  }
})
