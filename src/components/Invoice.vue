<template>
  <!-- <div class="invoice">
    <div class="invoice-info">
      <h1>{{ invoice.docId }}</h1>
    </div>
  </div> -->
  <router-link
    class="invoice flex"
    :to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }"
  >
    <div class="left flex">
      <span class="tracking-number">#{{ invoice.invoiceId }}</span>
      <span class="due-date">{{ invoice.paymentDueDate }}</span>
      <span class="person">{{ invoice.clientName }}</span>
    </div>
    <div class="right flex">
      <span class="price">${{ invoice.invoiceTotal }}</span>
      <div
        class="flex status-button"
        :class="{
          paid: invoice.invoicePaid,
          draft: invoice.invoiceDraft,
          pending: invoice.invoicePending,
        }"
      >
        <span v-if="invoice.invoicePaid">Paid</span>
        <span v-if="invoice.invoicePending">Pending</span>
        <span v-if="invoice.invoiceDraft">Draft</span>
      </div>
      <div class="icon">
        <img src="@/assets/icon-arrow-right.svg" alt="right-icon">
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Invoice",
  props: ["invoice"],
};
</script>

<style lang="scss" scoped>
.invoice {
  text-decoration: none;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  background: #1e2139;
  align-items: center;

  span {
    font-size: 13px;
  }

  .left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;

    span {
      flex: 1;
    }

    .tracking-number {
      text-transform: uppercase;
    }
    
  }

  .right {
    align-items: center;
    flex-basis: 40%;
    gap: 16px;

    .price {
      flex: 1;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>