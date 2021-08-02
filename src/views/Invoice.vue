<template>
  <div class="invoice-view container" v-if="singleInvoice">
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
            paid: singleInvoice.invoicePaid,
            draft: singleInvoice.invoiceDraft,
            pending: singleInvoice.invoicePending,
          }"
        >
          <span v-if="singleInvoice.invoicePaid">Paid</span>
          <span v-if="singleInvoice.invoicePending">Pending</span>
          <span v-if="singleInvoice.invoiceDraft">Draft</span>
        </div>
      </div>
      <div class="right flex">
        <button @click="toggleEditInvoice" class="dark-purple">Edit</button>
        <button @click="deleteInvoice(singleInvoice.docId)" class="red">
          Delete
        </button>
        <button
          @click="updateStatusToPaid(singleInvoice.docId)"
          class="green"
          v-if="singleInvoice.invoicePending"
        >
          Mark as Paid
        </button>
        <button
          @click="updateStatusToPending(singleInvoice.docId)"
          class="orange"
          v-if="singleInvoice.invoiceDraft || singleInvoice.invoicePaid"
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
          <p><span>#</span> {{ singleInvoice.invoiceId }}</p>
          <p>{{ singleInvoice.productDescription }}</p>
          <p>{{ showEditModal }}</p>
        </div>
        <div class="right flex flex-column">
          <p>{{ singleInvoice.billerStreetAddress }}</p>
          <p>{{ singleInvoice.billerCity }}</p>
          <p>{{ singleInvoice.billerZipCode }}</p>
          <p>{{ singleInvoice.billerCountry }}</p>
        </div>
      </div>
      <!-- MIDDLE OF INVOICE -->
      <div class="middle flex">
        <div class="payment flex flex-column">
          <h4>Invoice Date</h4>
          <p>
            {{ singleInvoice.invoiceDate }}
          </p>
          <h4>Payment Date</h4>
          <p>
            {{ singleInvoice.paymentDueDate }}
          </p>
        </div>
        <div class="bill flex flex-column">
          <h4>Bill To</h4>
          <p>
            {{ singleInvoice.clientName }}
          </p>
          <p>
            {{ singleInvoice.clientStreetAddress }}
          </p>
          <p>
            {{ singleInvoice.clientCity }}
          </p>
          <p>
            {{ singleInvoice.clientZipCode }}
          </p>
          <p>
            {{ singleInvoice.clientCountry }}
          </p>
        </div>
        <div class="send-to flex flex-column">
          <h4>Sent to</h4>
          <p>{{ singleInvoice.clientEmail }}</p>
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
            v-for="(item, index) in singleInvoice.invoiceItemList"
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
          <p>{{ singleInvoice.invoiceTotal }}</p>
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
  },
  computed: {
    ...mapGetters(["listOfInvoices", "singleInvoice", "showEditModal"]),
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
</style>