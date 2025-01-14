<template>
  <header
    class="header_class"
    :class="{ header_class_fixed: headerFixed }"
    ref="header_ref"
  >
    <div class="container">
      <nav class="flex --just-space">
        <div class="logo" @click="sendToMajorPage()">
          <img src="../assets/logo.png" alt="" srcset="" />
        </div>

        <div class="search-form">
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Поиск по сайту"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="flex --just-space">
            <li class="nav-item active">
              <div class="">
                <div class="svg_class svg" @click="sendToWishList()">
                  <HeartSvg></HeartSvg>

                  <div class="svg_class text">Wishlist</div>
                </div>
              </div>
            </li>
            <li class="nav-item active">
              <div class="d-flex flex-column" @click="sendToCartItem()">
                <div
                  class="svg_class svg"
                  @click="sendToCartItem()"
                  @mouseenter="shortCartItemModal.openModal()"
                  @mouseleave="shortCartItemModal.closeModal()"
                >
                  <CartItemSvg></CartItemSvg>

                  <div class="svg_class text" v-if="cartLength == 0">
                    CartItem
                  </div>
                  <div class="svg_class text" v-else>{{ price }} руб</div>
                </div>
              </div>

              <ShortCartItem
                v-if="
                  modalIsOpen &&
                  cartLength > 0 &&
                  NotificationModalIsOpen !== true
                "
                @closeOpenedShortCI="shortCartItemModal.keepModalOpened"
              >
              </ShortCartItem>
            </li>

            <li class="nav-item active">
              <div class="d-flex flex-column" @click="sendToUserSet()">
                <div
                  class="svg_class svg"
                  @click="sendToUserSet()"
                  @mouseenter="NotificationModal.openModal"
                  @mouseleave="NotificationModal.closeModal"
                >
                  <AccountSvg></AccountSvg>

                  <div class="svg_class text">Enter</div>
                </div>
              </div>
              <Notifications
                v-if="NotificationModalIsOpen && modalIsOpen !== true"
                @closeOpenedNotificationModal="
                  NotificationModal.keepModalOpened
                "
              >
              </Notifications>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import ModalClass from "@/hooks/modalClass";
import { Icon } from "@iconify/vue";
import HeartSvg from "@/assets/svg/Heart.vue";
import CartItemSvg from "@/assets/svg/CartItem.vue";
import AccountSvg from "@/assets/svg/Account.vue";
import { ROUTES_PATH } from "@/core/constants/routes";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { defineAsyncComponent } from "vue";
// import ShortCartItem from "./ShortCartItem.vue"
// import Notifications from "./NotificationModal.vue"
import { useProducts } from "@/store/modules/product";
const ShortCartItem = defineAsyncComponent(() => import("./ShortCartItem.vue"));
const Notifications = defineAsyncComponent(
  () => import("./NotificationModal.vue")
);
const props = defineProps({
  headerFixed: Boolean,
});

const price = computed(() => storePinia.calcPrice);
//Opening and closing modals
// shortCartItem == shortCI
const shortCartItemModal = new ModalClass();

const { value: modalIsOpen } = computed(() => shortCartItemModal.modalIsOpened);

//NotificationModal
const NotificationModal = new ModalClass();
const { value: NotificationModalIsOpen } = computed(
  () => NotificationModal.modalIsOpened
);

const router = useRouter();
const sendToMajorPage = () => {
  router.push(ROUTES_PATH.HOME);
};
const sendToWishList = () => {
  router.push(ROUTES_PATH.HOME.WISHLIST);
};
const sendToCartItem = () => {
  router.push(ROUTES_PATH.HOME.CARTITEM);
};
const sendToUserSet = () => {
  router.push(ROUTES_PATH.USERSETTINGS);
};

const storePinia = useProducts();
const cartLength = computed(() => storePinia.cart.length || 0);

// const price = computed(()=>{return store.getters.price})
</script>

<style lang="scss" scoped>
@import url("@/styles/nmarket.scss");
.header_class {
  width: 100%;
  padding-top: 20px;

  &_fixed {
    position: fixed;
    top: 0;

    z-index: 100;
  }
}
// .navbar {
//   position: fixed;
// }

.col-3 {
  cursor: pointer;
}
.nav-item {
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
}
.svg_class {
}

.btn-purple {
  background-color: plum;
}
</style>
