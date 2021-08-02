<template>
  <div class="modal flex">
    <div class="modal-content">
      <p>Are you sure you want to exit? Your changes will not be saved!</p>
      <div class="actions flex">
        <button @click="closeModal" class="purple">Return</button>
        <button @click="closeInvoice" class="red">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Modal",
  methods: {
    ...mapActions([
      "toggleLeaveModal",
      "toggleInvoiceModal",
      "toggleEditModal",
    ]),
    closeModal() {
      this.toggleLeaveModal();
    },
    closeInvoice() {
      this.toggleLeaveModal();
      this.toggleInvoiceModal();
      if (this.showEditModal) {
        this.toggleEditModal();
      }
    },
  },
  computed: {
    ...mapGetters(["showEditModal"]),
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 100;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  .modal-content {
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    color: #fff;
    background: #252945;

    p {
      text-align: center;
    }

    .actions {
      margin-top: 50px;

      button {
        flex: 1;
      }
    }
  }
}
</style>