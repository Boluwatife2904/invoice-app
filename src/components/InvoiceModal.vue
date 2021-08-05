<template>
  <div
    class="invoice-wrapper flex flex-column"
    @click.self="closeInvoice"
    ref="invoice-wrapper"
  >
    <form @submit.prevent="submitForm" class="invoice-content">
      <Loading v-show="isLoading" />
      <h1 v-if="showEditModal">Edit Invoice</h1>
      <h1 v-else>Create New Invoice</h1>
      <!-- Bill from -->
      <div class="bill-from flex flex-column">
        <h4>Bill from</h4>
        <div class="input flex flex-column">
          <label for="billerStreetAddress">Street Address</label>
          <input
            type="text"
            name="billerStreetAddress"
            id="billerStreetAddress"
            v-model.trim="billerStreetAddress"
            required
          />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity">City</label>
            <input
              type="text"
              name="billerCity"
              id="billerCity"
              v-model.trim="billerCity"
              required
            />
          </div>
          <div class="input flex flex-column">
            <label for="billerStreetAddressZipCode">Zip Code</label>
            <input
              type="text"
              name="billerZipCode"
              id="billerZipCode"
              v-model.trim="billerZipCode"
              required
            />
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry">Country</label>
            <input
              type="text"
              name="billerCountry"
              id="billerCountry"
              v-model.trim="billerCountry"
              required
            />
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="bill-to flex flex-column">
        <h4>Bill to</h4>
        <div class="input flex flex-column">
          <label for="clientName">Client's Name</label>
          <input
            type="text"
            name="clientName"
            id="clientName"
            v-model.trim="clientName"
            required
          />
        </div>
        <div class="input flex flex-column">
          <label for="clientEmail">Client's Email</label>
          <input
            type="text"
            name="clientEmail"
            id="clientEmail"
            v-model.trim="clientEmail"
            required
          />
        </div>
        <div class="input flex flex-column">
          <label for="clientStreetAddress">Street Address</label>
          <input
            type="text"
            name="clientStreetAddress"
            id="clientStreetAddress"
            v-model.trim="clientStreetAddress"
            required
          />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="clientCity">City</label>
            <input
              type="text"
              name="clientCity"
              id="clientCity"
              v-model.trim="clientCity"
              required
            />
          </div>
          <div class="input flex flex-column">
            <label for="clientStreetAddressZipCode">Zip Code</label>
            <input
              type="text"
              name="clientZipCode"
              id="clientZipCode"
              v-model.trim="clientZipCode"
              required
            />
          </div>
          <div class="input flex flex-column">
            <label for="clientCountry">Country</label>
            <input
              type="text"
              name="clientCountry"
              id="clientCountry"
              v-model.trim="clientCountry"
              required
            />
          </div>
        </div>
      </div>

      <!-- Invoice Work Details -->
      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="invoiceDate">Invoice Date</label>
            <input
              type="text"
              name="invoiceDate"
              id="invoiceDate"
              v-model.trim="invoiceDate"
              disabled
            />
          </div>
          <div class="input flex flex-column">
            <label for="paymentDueDate">Payment Due</label>
            <input
              type="text"
              name="paymentDueDate"
              id="paymentDueDate"
              v-model.trim="paymentDueDate"
              disabled
            />
          </div>
        </div>
        <div class="input flex flex-column">
          <label for="paymentTerms">Payment Terms</label>
          <select
            name="paymentTerms"
            id="paymentTerms"
            v-model.trim="paymentTerms"
          >
            <option value="3">3 days</option>
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="30">30 days</option>
            <option value="60">60 days</option>
          </select>
        </div>
        <div class="input flex flex-column">
          <label for="productDescription">Product Description</label>
          <input
            type="text"
            name="productDescription"
            id="productDescription"
            v-model.trim="productDescription"
            required
          />
        </div>
      </div>

      <!-- Items List -->
      <div class="items-list flex flex-column">
        <h3>Items List</h3>
        <table class="table">
          <tr class="table-heading flex">
            <th class="name">Item Name</th>
            <th class="qty">Qty</th>
            <th class="price">Price</th>
            <th class="total">Total</th>
          </tr>
          <tr
            class="table-item flex"
            v-for="item in invoiceItemList"
            :key="item.id"
          >
            <td class="name"><input type="text" v-model="item.name" /></td>
            <td class="qty">
              <input type="number" v-model.number="item.qty" />
            </td>
            <td class="price">
              <input type="number" v-model.number="item.price" />
            </td>
            <td class="total">&#8358; {{ (item.total = item.qty * item.price) }}</td>
            <img
              @click="deleteInvoiceItem(item.id)"
              src="@/assets/icon-delete.svg"
              alt="delete-icon"
            />
          </tr>
        </table>
        <button @click="addNewInvoiceItem" class="flex button" type="button">
          <img src="@/assets/icon-plus.svg" alt="plus-icon" />
          <span>Add new item</span>
        </button>
      </div>

      <!-- Actions -->
      <div class="actions flex">
        <div class="left">
          <button type="button" class="red" @click="closeInvoice">
            Cancel
          </button>
        </div>

        <div class="right flex">
          <button
            v-if="!showEditModal"
            type="submit"
            class="dark-purple"
            @click="saveAsDraft"
          >
            Save Draft
          </button>
          <button
            v-if="!showEditModal"
            type="submit"
            class="purple"
            @click="publishInvoice"
          >
            Create Invoice
          </button>
          <button v-if="showEditModal" type="submit" class="purple">
            Update Invoice
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { projectFirestore } from "@/firebase/config";
import { uid } from "uid";
import Loading from "./Loading.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { Loading },
  name: "InvoiceModal",
  data() {
    return {
      isLoading: false,
      currentInvoice: null,
      docId: null,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
    };
  },
  created() {
    if (!this.showEditModal) {
      this.invoiceDateUnix = Date.now();
      this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString(
        "en-us",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
    }
    if (this.showEditModal) {
      this.currentInvoice = JSON.parse(JSON.stringify(this.singleInvoice));
      this.docId = this.currentInvoice.docId;
      this.billerStreetAddress = this.currentInvoice.billerStreetAddress;
      this.billerCity = this.currentInvoice.billerCity;
      this.billerZipCode = this.currentInvoice.billerZipCode;
      this.billerCountry = this.currentInvoice.billerCountry;
      this.clientName = this.currentInvoice.clientName;
      this.clientEmail = this.currentInvoice.clientEmail;
      this.clientStreetAddress = this.currentInvoice.clientStreetAddress;
      this.clientCity = this.currentInvoice.clientCity;
      this.clientZipCode = this.currentInvoice.clientZipCode;
      this.clientCountry = this.currentInvoice.clientCountry;
      this.invoiceDateUnix = this.currentInvoice.invoiceDateUnix;
      this.invoiceDate = this.currentInvoice.invoiceDate;
      this.paymentTerms = this.currentInvoice.paymentTerms;
      this.paymentDueDateUnix = this.currentInvoice.paymentDueDateUnix;
      this.paymentDueDate = this.currentInvoice.paymentDueDate;
      this.productDescription = this.currentInvoice.productDescription;
      this.invoicePending = this.currentInvoice.invoicePending;
      this.invoiceDraft = this.currentInvoice.invoiceDraft;
      this.invoiceItemList = this.currentInvoice.invoiceItemList;
      this.invoiceTotal = this.currentInvoice.invoiceTotal;
    }
  },
  methods: {
    ...mapActions(["toggleEditModal", "updateInvoice", "toggleInvoiceModal", "fetchInvoicesFromServer"]),
    addNewInvoiceItem() {
      this.invoiceItemList.push({
        id: uid(),
        name: "",
        qty: "",
        price: 0,
        total: 0,
      });
    },
    deleteInvoiceItem(id) {
      this.invoiceItemList = this.invoiceItemList.filter(
        (item) => item.id !== id
      );
    },
    closeInvoice() {
      this.$store.dispatch("toggleLeaveModal");
      // if (this.showEditModal) {
      //   this.toggleEditModal();
      // }
    },
    calculateInvoiceTotal() {
      this.invoiceTotal = 0;
      this.invoiceItemList.forEach((item) => {
        this.invoiceTotal += item.total;
      });
    },
    publishInvoice() {
      this.invoicePending = true;
    },
    saveAsDraft() {
      this.invoiceDraft = true;
    },
    async uploadInvoice() {
      if (this.invoiceItemList.length <= 0) {
        alert("You have not added any item!");
        return;
      }
      this.isLoading = true;
      this.calculateInvoiceTotal();

      const dataBase = projectFirestore.collection("invoices").doc();

      await dataBase.set({
        invoiceId: uid(6),
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        invoiceDate: this.invoiceDate,
        invoiceDateUnix: this.invoiceDateUnix,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
        invoicePending: this.invoicePending,
        invoiceDraft: this.invoiceDraft,
        invoicePaid: null,
      });
      await this.fetchInvoicesFromServer();
      this.isLoading = false;
      this.$store.dispatch("toggleInvoiceModal");
    },
    async updateInvoice() {
      if (this.invoiceItemList.length <= 0) {
        alert("You have not added any item!");
        return;
      }
      this.calculateInvoiceTotal();
      this.isLoading = true;

      const dataBase = projectFirestore.collection("invoices").doc(this.docId);

      await dataBase.update({
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
      });

      let data = {
        docId: this.docId,
        invoiceId: this.$route.params.invoiceId
      }
      this.$store.dispatch("updateInvoice", data)
      this.isLoading = false;
    },
    submitForm() {
      if(this.showEditModal) {
        this.updateInvoice();
        return;
      }
      this.uploadInvoice();
    },
  },
  watch: {
    paymentTerms() {
      const futureDate = new Date();
      this.paymentDueDateUnix = futureDate.setDate(
        futureDate.getDate() + parseInt(this.paymentTerms)
      );
      this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleString(
        "en-us",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
    },
  },
  computed: {
    ...mapGetters(["showEditModal", "singleInvoice"]),
  },
};
</script>

<style lang="scss" scoped>
.invoice-wrapper {
  position: fixed;
  background-color: transparent;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 11;

  &::-webkit-scrollbar {
    display: none !important;
  }

  @media (min-width: 900px) {
    left: 90px;
  }

  .invoice-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    h1 {
      margin-bottom: 48px;
      color: #fff;
    }

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }

    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }

    // Bill To / Bill From
    .bill-to,
    .bill-from {
      margin-bottom: 48px;

      .location-details {
        gap: 16px;

        div {
          flex: 1;
        }
      }
    }

    // Payment details
    .invoice-work {
      .payment {
        gap: 24px;

        div {
          flex: 1;
        }
      }
    }

    // Items List (Table)
    .items-list {
      .table {
        width: 100%;

        .table-heading,
        .table-item {
          gap: 16px;
          font-size: 12px;

          .name {
            flex-basis: 50%;
          }

          .qty {
            flex-basis: 10%;
          }

          .price {
            flex-basis: 20%;
          }

          .total {
            flex-basis: 20%;
            align-self: center;
          }
        }

        .table-heading {
          margin-bottom: 16px;

          th {
            text-align: left;
          }
        }

        .table-item {
          margin-bottom: 24px;
          position: relative;

          img {
            position: absolute;
            top: 15px;
            right: 0;
            width: 12px;
            height: 16px;
            cursor: pointer;
          }
        }
      }

      .button {
        color: #fff;
        background: #252945;
        align-items: center;
        justify-content: center;
        width: 100%;

        img {
          margin-right: 4px;
          height: 12px;
        }
      }
    }

    // Actions
    .actions {
      margin-top: 60px;

      div {
        flex: 1;
      }

      .right {
        justify-content: flex-end;
      }
    }
  }

  .input {
    margin-bottom: 24px;
  }

  label {
    font-size: 12px;
    margin-bottom: 6px;
    display: inline-block;
  }

  input,
  select {
    width: 100%;
    background: #1e2139;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;

    &:focus {
      outline: none;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  select {
    cursor: pointer;
  }
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>