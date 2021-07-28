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
        <button
          @click="toggleEditInvoice(currentInvoice.docId)"
          class="dark-purple"
        >
          Edit
        </button>
        <button @click="deleteInvoice(currentInvoice.docId)" class="red">
          Delete
        </button>
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
      <div class="middle flex flex-column">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Invoice",
  props: ["invoiceId"],
  data() {
    return {
      currentInvoice: null,
    };
  },
  created() {
    this.setActiveInvoice(this.invoiceId);
  },
  methods: {
    setActiveInvoice(invoiceId) {
      this.currentInvoice = this.listOfInvoices.find(
        (invoice) => invoice.invoiceId === invoiceId
      );
    },
  },
  computed: {
    ...mapGetters(["listOfInvoices"]),
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
    }
  }
}
</style>