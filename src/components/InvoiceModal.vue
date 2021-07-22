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
      <div class="invoice-items-flex flex-column">
        <h4>Items List</h4>
        <table class="items-list">
          <tr class="table-heading flex">
            <th class="item-name">Item Name</th>
            <th class="qty">Qty</th>
            <th class="price">Price</th>
            <th class="total">Total</th>
          </tr>
          <tr
            class="table-items flex"
            v-for="(item, index) in invoiceItemList"
            :key="index"
          >
            <td class="item-name"><input type="text" v-model="item.name" /></td>
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
        <div @click="addNewInvoiceItem" class="flex button" type="button">
          <img src="@/assets/icon-plus.svg" alt="plus-icon" />
          Add new item
        </div>
      </div>

      <!-- Actions -->
      <div class="actions flex">
        <div class="left">
          <button class="red" @click="closeInvoice">Discard</button>
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
      invoiceItemList: [
        {
          name: "Biscuit",
          qty: 3,
          price: 4,
          total: 0,
        },
        {
          name: "Sweet",
          qty: 2,
          price: 14,
          total: 0,
        },
        {
          name: "CHewing gum",
          qty: 6,
          price: 19,
          total: 0,
        },
      ],
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
  },
};
</script>

<style>
div {
  color: #fff;
}
</style>