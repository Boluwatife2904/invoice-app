<template>
  <p>
   Document with the id {{ invoiceId }}
  </p>
</template>

<script>
export default {
  name: "Invoice",
  props: ["invoiceId"],
};
</script>

<style>
p {
  color: #fff;
}
</style>