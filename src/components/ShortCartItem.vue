<template>
  <modal-form
    @mouseover="setCursorOverModal(true)"
    @mouseleave="setCursorOverModal(false)"
  >
    <div class="shortcartitem">
      <div class="d-flex justify-content-between">
        <div>
          <h2>Buy products: {{ products.length }}</h2>
        </div>
        <div @click="cleanCartItem()"><h3>Очистить корзину</h3></div>
      </div>
      <hr />

      <div class="" v-for="product in products" :key="product.id">
        <div class="row mb-3">
          <div class="col-4 image_class">
            <img
              :src="getImageUrl(product.img[0])"
              class="img-fluid img-height"
              alt="..."
            />
          </div>
          <div class="col-8">
            <div class="d-flex justify-content-between">
              <h4>{{ product.title }} x:{{ product.quantity }}</h4>
              <div @click="removeFromCart(product)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="d-flex justify-content-between">
        <div>Total price:</div>
        <div>{{ price }} руб</div>
      </div>
      <div><button @click="sendToCartItem()">За покупками</button></div>
    </div></modal-form
  >
  <div class="modalBackground"></div>
</template>

<script setup lang="ts">
import ModalsForm from "./ModalsForm.vue";
import { reactive, toRefs, onMounted, computed, ref, watch } from "vue";

import { useRouter } from "vue-router";
import { useProducts } from "../store/modules/product";
const props = defineProps({
  showModal: Boolean,
});
const setCursorOverModal = (bool: boolean): void => {
  emit("closeOpenedShortCI", bool);
};
const emit = defineEmits(["closeOpenedShortCI"]);

const storePinia = useProducts();

const router = useRouter();
const sendToCartItem = () => {
  router.push("/cartitem");
};

const products = computed(() => {
  return storePinia.cart;
});
const removeFromCart = (product): void => {
  storePinia.removeFromCart(product);
  storePinia.calculatePrice;
};
const cleanCartItem = (): void => {
  storePinia.cleanCartItem();
  storePinia.calculatePrice();
};
const getImageUrl = (name: string): string => {
  return new URL(`/src/assets/${name}`, import.meta.url).href;
};

//     onMounted(() => {
//             store.commit('calcPrice')
// })
onMounted(() => {
  storePinia.calculatePrice();
});
const price = computed(() => {
  return storePinia.price;
});
const state = reactive({
  count: 0,
});
</script>

<style lang="scss" scoped>
@import url("@/styles/shortcartitem.scss");
.shortcartitem {
  opacity: 0;
  animation: showModalForm 0.15s ease-in forwards;
}
@keyframes showModalForm {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
h2,
h3 {
  font-weight: 400;
  font-size: 25px;
}
.modalBackground {
  position: fixed;
  width: 200%;
  height: 200%;
  background-color: black;
  top: -200px;
  z-index: 80;
  opacity: 0.5;
  left: -500px;
}
</style>
