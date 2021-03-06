import { createStore } from "vuex";
import { projectFirestore } from "../firebase/config";

export default createStore({
  state: {
    listOfInvoices: [],
    singleInvoice: null,
    showInvoiceModal: false,
    showLeaveModal: false,
    showEditModal: false,
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
      state.singleInvoice = payload;
    },
    deleteInvoice(state, payload) {
      state.listOfInvoices = state.listOfInvoices.filter(
        (invoice) => invoice.docId !== payload
      );
    },
    updateStatusToPaid(state, payload) {
      state.listOfInvoices.forEach((invoice) => {
        if (invoice.docId === payload) {
          invoice.invoicePaid = true;
          invoice.invoicePending = false;
        }
      });
    },
    updateStatusToPending(state, payload) {
      state.listOfInvoices.forEach((invoice) => {
        if (invoice.docId === payload) {
          invoice.invoicePaid = false;
          invoice.invoicePending = true;
          invoice.invoiceDraft = false;
        }
      });
    },
  },
  actions: {
    toggleInvoiceModal(context) {
      context.commit("toggleInvoiceModal");
    },
    toggleLeaveModal(context) {
      context.commit("toggleLeaveModal");
    },
    toggleEditModal(context) {
      context.commit("toggleEditModal");
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
    async deleteInvoice({ commit }, payload) {
      const database = projectFirestore.collection("invoices").doc(payload);
      await database.delete();
      commit("deleteInvoice", payload);
    },
    findSingleInvoice({ commit, state }, payload) {
      const invoice = state.listOfInvoices.find(
        (invoice) => invoice.invoiceId === payload
      );
      commit("setSingleInvoice", invoice);
    },
    async updateInvoice({ commit, dispatch }, { docId, invoiceId }) {
      commit("deleteInvoice", docId);
      await dispatch("fetchInvoicesFromServer");
      dispatch("toggleInvoiceModal");
      dispatch("toggleEditModal");
      dispatch("findSingleInvoice", invoiceId);
    },
    async updateStatusToPaid({ commit }, payload) {
      const database = projectFirestore.collection("invoices").doc(payload);
      await database.update({
        invoicePaid: true,
        invoicePending: false
      })
      commit("updateStatusToPaid", payload)
    },
    async updateStatusToPending({ commit }, payload) {
      const database = projectFirestore.collection("invoices").doc(payload);
      await database.update({
        invoicePaid: false,
        invoicePending: true,
        invoiceDraft: false
      })
      commit("updateStatusToPending", payload)
    }
  },
  modules: {},
  getters: {
    listOfInvoices: (state) => state.listOfInvoices,
    singleInvoice: (state) => state.singleInvoice,
    showInvoiceModal: (state) => state.showInvoiceModal,
    showLeaveModal: (state) => state.showLeaveModal,
    showEditModal: (state) => state.showEditModal,
  },
});
