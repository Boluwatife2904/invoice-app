<template>
  <div class="invoice-view container" v-if="currentInvoice">
    <router-link class="nav-link flex" :to="{ name: 'Home' }">
      <img src="@/assets/icon-arrow-left.svg" alt="arrow-left" />
      Go back
    </router-link>
    <!-- HEADER -->
    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div
          class="flex status-button"
          :class="{
            paid: currentInvoice.invoicePaid,
            draft: currentInvoice.invoiceDraft,
            pending: currentInvoice.invoicePending,
          }"
        >
          <span v-if="currentInvoice.invoicePaid">Paid</span>
          <span v-if="currentInvoice.invoicePending">Pending</span>
          <span v-if="currentInvoice.invoiceDraft">Draft</span>
        </div>
      </div>
      <div class="right flex">
        <button @click="toggleEditInvoice" class="dark-purple">Edit</button>
        <button @click="openDeleteModal = true" class="red">Delete</button>
        <button
          @click="updateStatusToPaid(currentInvoice.docId)"
          class="green"
          v-if="currentInvoice.invoicePending"
        >
          Mark as Paid
        </button>
        <button
          @click="updateStatusToPending(currentInvoice.docId)"
          class="orange"
          v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
        >
          Mark as Pending
        </button>
      </div>
    </div>

    <!--  INVOICE INFORMATION -->
    <div class="invoice-details flex flex-column">
      <!-- TOP OF INVOICE -->
      <div class="top flex">
        <div class="left flex flex-column">
          <p><span>#</span> {{ currentInvoice.invoiceId }}</p>
          <p>{{ currentInvoice.productDescription }}</p>
        </div>
        <div class="right flex flex-column">
          <p>{{ currentInvoice.billerStreetAddress }}</p>
          <p>{{ currentInvoice.billerCity }}</p>
          <p>{{ currentInvoice.billerZipCode }}</p>
          <p>{{ currentInvoice.billerCountry }}</p>
        </div>
      </div>
      <!-- MIDDLE OF INVOICE -->
      <div class="middle flex">
        <div class="payment flex flex-column">
          <h4>Invoice Date</h4>
          <p>
            {{ currentInvoice.invoiceDate }}
          </p>
          <h4>Payment Date</h4>
          <p>
            {{ currentInvoice.paymentDueDate }}
          </p>
        </div>
        <div class="bill flex flex-column">
          <h4>Bill To</h4>
          <p>
            {{ currentInvoice.clientName }}
          </p>
          <p>
            {{ currentInvoice.clientStreetAddress }}
          </p>
          <p>
            {{ currentInvoice.clientCity }}
          </p>
          <p>
            {{ currentInvoice.clientZipCode }}
          </p>
          <p>
            {{ currentInvoice.clientCountry }}
          </p>
        </div>
        <div class="send-to flex flex-column">
          <h4>Sent to</h4>
          <p>{{ currentInvoice.clientEmail }}</p>
        </div>
      </div>
      <!-- BOTTOM OF INVOICE -->
      <div class="bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p>Item Name</p>
            <p>QTY</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <div
            class="item flex"
            v-for="(item, index) in currentInvoice.invoiceItemList"
            :key="index"
          >
            <p>{{ item.name }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.total }}</p>
          </div>
        </div>
        <div class="total flex">
          <p>Amount Due</p>
          <p>{{ currentInvoice.invoiceTotal }}</p>
        </div>
      </div>
    </div>

    <!-- CONFIRMATION BEFORE DELETING -->
    <div class="modal flex" v-if="openDeleteModal">
      <div class="modal-content">
        <p>
          Are you sure you want to delete this invoice? You will no longer be
          able to view, or edit this invoice!
        </p>
        <div class="actions flex">
          <button @click="openDeleteModal = false" class="purple">
            Cancel
          </button>
          <button @click="deleteInvoice(currentInvoice.docId)" class="red">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Invoice",
  props: ["invoiceId"],
  async created() {
    if (this.listOfInvoices.length === 0) {
      await this.fetchInvoicesFromServer();
    }
    this.findSingleInvoice(this.invoiceId);
    this.currentInvoice = this.singleInvoice;
  },
  data() {
    return {
      openDeleteModal: false,
      currentInvoice: null,
    };
  },
  methods: {
    ...mapActions([
      "fetchInvoicesFromServer",
      "toggleEditModal",
      "toggleInvoiceModal",
      "findSingleInvoice",
    ]),
    toggleEditInvoice() {
      this.toggleEditModal();
      this.toggleInvoiceModal();
    },
    async deleteInvoice(id) {
      await this.$store.dispatch("deleteInvoice", id);
      await this.fetchInvoicesFromServer();
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters(["listOfInvoices", "singleInvoice", "showEditModal"]),
  },
  watch: {
    showEditModal() {
      if (!this.showEditModal) {
        this.currentInvoice = JSON.parse(JSON.stringify(this.singleInvoice));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice-view {
  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    color: #fff;
    font-size: 12px;

    img {
      margin-right: 16px;
      width: 7px;
      height: 10px;
    }
  }

  .header,
  .invoice-details {
    background: #1e2139;
    border-radius: 20px;
  }

  .header {
    padding: 24px 32px;
    align-items: center;
    font-size: 12px;

    .left {
      align-items: center;

      span {
        color: #dfe3fa;
        margin-right: 16px;
      }
    }

    .right {
      flex: 1;
      justify-content: flex-end;

      button {
        color: #fff;
      }
    }
  }

  .invoice-details {
    padding: 48px;
    margin-top: 24px;

    .top {
      div {
        color: #dfe3fa;
        flex: 1;
      }

      .left {
        font-size: 12px;

        p:first-child {
          font-size: 24px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 8px;
        }

        p:nth-child(2) {
          font-size: 16px;
        }

        span {
          color: #888eb0;
        }
      }

      .right {
        font-size: 12px;
        align-items: flex-end;
      }
    }

    .middle {
      margin-top: 50px;
      color: #dfe3fa;
      gap: 16px;

      h4 {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 12px;
      }

      .bill,
      .payment {
        flex: 1;
      }

      .payment {
        h4:nth-child(3) {
          margin-top: 32px;
        }

        p {
          font-weight: 600;
        }
      }

      .bill {
        p {
          font-size: 12px;

          &:nth-child(2) {
            font-size: 16px;
          }

          &:nth-child(3) {
            margin-top: auto;
          }
        }
      }

      .send-to {
        flex: 2;
      }
    }

    .bottom {
      margin-top: 50px;

      .billing-items {
        padding: 32px;
        border-radius: 20px 20px 0 0;
        background-color: #252945;

        .heading {
          color: #dfe3fa;
          font-size: 12px;
          margin-bottom: 32px;

          p {
            flex: 1;
            text-align: right;

            &:first-child {
              flex: 3;
              text-align: left;
            }
          }
        }

        .item {
          color: #fff;
          margin-bottom: 32px;
          font-size: 13px;

          &:last-child {
            margin-bottom: 0;
          }

          p {
            flex: 1;
            text-align: right;

            &:first-child {
              flex: 3;
              text-align: left;
            }
          }
        }
      }

      .total {
        color: #fff;
        padding: 32px;
        background: rgba(12, 14, 22, 0.7);
        align-items: center;
        border-radius: 0 0 20px 20px;

        p {
          flex: 1;
          font-size: 12px;

          &:nth-child(2) {
            font-size: 28px;
            text-align: right;
          }
        }
      }
    }
  }
}

.modal {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
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