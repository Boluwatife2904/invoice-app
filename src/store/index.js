import { createStore } from "vuex";
import { projectFirestore } from "../firebase/config";

export default createStore({
  state: {
    listOfInvoices: [],
    showInvoiceModal: false,
    showLeaveModal: false,
  },
  mutations: {
    toggleInvoiceModal(state) {
      state.showInvoiceModal = !state.showInvoiceModal;
    },
    toggleLeaveModal(state) {
      state.showLeaveModal = !state.showLeaveModal;
    },
    addInvoiceToList(state, payload) {
      state.listOfInvoices.push(payload);
    },
  },
  actions: {
    toggleInvoiceModal(context) {
      context.commit("toggleInvoiceModal");
    },
    toggleLeaveModal(context) {
      context.commit("toggleLeaveModal");
    },
    async fetchInvoicesFromServer({ commit, state }) {
      const database = projectFirestore.collection("invoices");
      const databaseData = await database.get();
      databaseData.docs.forEach((doc) => {
        if (!state.listOfInvoices.some((invoice) => invoice.docId === doc.id)) {
          const data = { ...doc.data(), docId: doc.id };
          commit("addInvoiceToList", data);
        }
      });
    },
  },
  modules: {},
  getters: {
    listOfInvoices: (state) => state.listOfInvoices,
    showInvoiceModal: (state) => state.showInvoiceModal,
    showLeaveModal: (state) => state.showLeaveModal,
  },
});
