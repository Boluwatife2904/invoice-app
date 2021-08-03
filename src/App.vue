<template>
  <div>
    <div class="app flex flex-column" v-if="!onMobile">
      <Navigation />
      <div class="app-content flex flex-column">
        <Modal v-if="showLeaveModal" />
        <transition name="slide" mode="out-in">
          <InvoiceModal v-if="showInvoiceModal"
        /></transition>
        <router-view />
      </div>
    </div>
    <div class="mobile-message flex flex-column" v-else>
      <h2>Sorry, but viewing on Mobile Devices is currently not supported.</h2>
      <p>
        To use this app, you might need to log on with your computer or tablet
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navigation from "./components/Navigation.vue";
import InvoiceModal from "./components/InvoiceModal.vue";
import Modal from './components/Modal.vue';

export default {
  components: { Navigation, InvoiceModal, Modal },
  data() {
    return {
      onMobile: null,
    };
  },
  methods: {
    checkScreenSize() {
      if (window.innerWidth <= 750) {
        this.onMobile = true;
        return;
      }
      this.onMobile = false;
    },
  },
  created() {
    this.checkScreenSize();
    window.addEventListener("resize", () => {
      this.checkScreenSize();
    });
  },
  computed: {
    ...mapGetters(["showInvoiceModal", "showLeaveModal"]),
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.app {
  background: #141625;
  min-height: 100vh;

  @media (min-width: 900px) {
    flex-direction: row !important;
  }

  .app-content {
    padding: 0 20px;
    flex: 1;
    position: relative;
  }
}

.mobile-message {
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  background-color: #141625;
  color: #fff;
  padding: 20px;

  p {
    margin-top: 16px;
  }
}

button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  color: #fff;
}

.dark-purple {
  background-color: #252945;
}

.red {
  background-color: #ec5757;
}

.purple {
  background-color: #7c5dfa;
}

.green {
  background-color: #33d69f;
}

.orange {
  background-color: #ff8f00;
}

// utility classes

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;

  @media (min-width: 900px) {
    padding-top: 72px;
  }
}

.nav-link {
  text-decoration: none;
  color: initial;
}

// Status Button Styling

.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}

.paid {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}

.pending {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}

.draft {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-700px);
  // opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.8s ease;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  // opacity: 1;
}
</style>
