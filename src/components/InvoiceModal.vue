<template>
  <div
    class="invoice-wrapper flex flex-column"
    @click="checkClick"
    ref="invoice-wrapper"
  >
    <form @submit.prevent="createInvoice" class="invoice-content">
      <h1>New Invoice</h1>
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
            />
          </div>
          <div class="input flex flex-column">
            <label for="billerStreetAddressZipCode">Zip Code</label>
            <input
              type="text"
              name="billerZipCode"
              id="billerZipCode"
              v-model.trim="billerZipCode"
            />
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry">Country</label>
            <input
              type="text"
              name="billerCountry"
              id="billerCountry"
              v-model.trim="billerCountry"
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
          />
        </div>
        <div class="input flex flex-column">
          <label for="clientEmail">Client's Email</label>
          <input
            type="text"
            name="clientEmail"
            id="clientEmail"
            v-model.trim="clientEmail"
          />
        </div>
        <div class="input flex flex-column">
          <label for="clientStreetAddress">Street Address</label>
          <input
            type="text"
            name="clientStreetAddress"
            id="clientStreetAddress"
            v-model.trim="clientStreetAddress"
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
            />
          </div>
          <div class="input flex flex-column">
            <label for="clientStreetAddressZipCode">Zip Code</label>
            <input
              type="text"
              name="clientZipCode"
              id="clientZipCode"
              v-model.trim="clientZipCode"
            />
          </div>
          <div class="input flex flex-column">
            <label for="clientCountry">Country</label>
            <input
              type="text"
              name="clientCountry"
              id="clientCountry"
              v-model.trim="clientCountry"
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
            <option value="30">Net 30 days</option>
            <option value="60">Net 60 days</option>
          </select>
        </div>
        <div class="input flex flex-column">
          <label for="productDescription">Product Description</label>
          <input
            type="text"
            name="productDescription"
            id="productDescription"
            v-model.trim="productDescription"
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
            v-for="(item, index) in invoiceItemList"
            :key="index"
          >
            <td class="name"><input type="text" v-model="item.name" /></td>
            <td class="qty"><input type="text" v-model="item.qty" /></td>
            <td class="price"><input type="text" v-model="item.price" /></td>
            <td class="total">${{ (item.total = item.qty * item.price) }}</td>
            <img
              @click="deleteInvoice(item.id)"
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
          <button class="red" @click="closeInvoice">Cancel</button>
        </div>

        <div class="right flex">
          <button class="dark-purple" @click="saveAsDraft">Save Draft</button>
          <button class="purple" @click="publishInvoice">Create Invoice</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "InvoiceModal",
  data() {
    return {
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
  methods: {
    addNewInvoiceItem() {
      this.invoiceItemList.push({
        name: null,
        qty: null,
        price: null,
        total: 0,
      });
    },
    closeInvoice() {
      this.$store.dispatch("toggleInvoiceModal");
    }
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
  overflow: scroll;
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
  }
}
</style>