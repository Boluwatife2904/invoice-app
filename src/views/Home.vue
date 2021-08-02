<template>
  <div class="home container">
    <!-- Header -->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Invoices</h1>
        <span>There are 4 total invoices</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span>Filter by status</span>
          <img src="@/assets/icon-arrow-down.svg" alt="arrow-down" />
          <ul class="filter-menu" v-show="filterMenu">
            <li>Draft</li>
            <li>Pending</li>
            <li>Paid</li>
            <li>Clear Filter</li>
          </ul>
        </div>
        <div @click="createNewInvoice" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.svg" alt="plus-side" />
          </div>
          <span>New Invoice</span>
        </div>
      </div>
    </div>
    <!-- LOADIING -->
    <div v-if="isLoading">loading..........</div>
    <!-- LIST OF ITEMS -->
    <div class="list" v-else-if="!isLoading && listOfInvoices.length > 0">
      <Invoice
        v-for="invoice in listOfInvoices"
        :key="invoice.invoiceId"
        :invoice="invoice"
      />
    </div>
    <!-- EMPTY STATE -->
    <div class="empty flex flex-column" v-else>
      <img src="@/assets/illustration-empty.svg" alt="empty" />
      <h3>Nothing to see here!</h3>
      <p>
        Create a new invoice by clicking the New Invoice button to get started.
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Invoice from "../components/Invoice.vue";
export default {
  components: { Invoice },
  name: "Home",
  data() {
    return {
      isLoading: true,
      filterMenu: false,
    };
  },
  methods: {
    ...mapActions(["toggleInvoiceModal", "fetchInvoicesFromServer"]),
    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },
    createNewInvoice() {
      this.toggleInvoiceModal();
    },
  },
  async created() {
    if (this.listOfInvoices.length === 0) {
      await this.fetchInvoicesFromServer();
    }
    this.isLoading = false;
  },
  computed: {
    ...mapGetters(["listOfInvoices"]),
  },
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;

  .header {
    margin-bottom: 65px;

    .left,
    .right {
      flex: 1;
    }

    .right {
      justify-content: flex-end;
      align-items: center;

      .filter,
      .button {
        align-items: center;

        span {
          font-size: 12px;
        }
      }

      .filter {
        position: relative;
        cursor: pointer;
        margin-right: 40px;

        img {
          margin-left: 12px;
          width: 9px;
          height: 5px;
        }

        .filter-menu {
          position: absolute;
          width: 120px;
          top: 25px;
          list-style: none;
          background: #1e2139;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          li {
            cursor: pointer;
            font-size: 12px;
            padding: 10px 20px;

            &:hover {
              color: #1e2139;
              background: #fff;
            }
          }
        }
      }

      .button {
        padding: 8px 10px;
        background: #7c4dfa;
        border-radius: 40px;

        .inner-button {
          background: #fff;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          padding: 8px;
          margin-right: 8px;

          img {
            height: 10px;
            width: 10px;
          }
        }
      }
    }
  }

  .empty {
    align-items: center;

    img {
      height: 200px;
      width: 214px;
    }

    h3 {
      font-size: 20px;
      margin-top: 40px;
    }

    p {
      text-align: center;
      max-width: 320px;
      font-size: 16px;
      font-weight: 300;
      margin-top: 16px;
    }
  }
}
</style>
