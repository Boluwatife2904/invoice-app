import { createStore } from "vuex";
import { projectFirestore } from "../firebase/config";

export default createStore({
  state: {
    listOfInvoices: [],
    singleInvoice: null,
    showInvoiceModal: false,
    showLeaveModal: false,
    showEditModal: false
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
    toggleEditModal(state) {
      state.showEditModal = !state.showEditModal;
    },
    setSingleInvoice(state, payload) {
      state.singleInvoice = payload
    }
  },
  actions: {
    toggleInvoiceModal(context) {
      context.commit("toggleInvoiceModal");
    },
    toggleLeaveModal(context) {
      context.commit("toggleLeaveModal");
    },
    toggleEditModal(context) {
      context.commit("toggleEditModal")
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
    findSingleInvoice({commit, state}, payload) {
      const invoice = state.listOfInvoices.find(
        (invoice) => invoice.invoiceId === payload
      );
      commit("setSingleInvoice", invoice)
    }
  },
  modules: {},
  getters: {
    listOfInvoices: (state) => state.listOfInvoices,
    singleInvoice: (state) => state.singleInvoice,
    showInvoiceModal: (state) => state.showInvoiceModal,
    showLeaveModal: (state) => state.showLeaveModal,
    showEditModal: (state) => state.showEditModal
  },
});
