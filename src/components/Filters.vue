<template>
  <div class="select">
    <input class="select__input" type="hidden" name="" />
    <div class="select__head">
      Фильтр по цене
      <div
        class="select-daw"
        :class="selectIsActive ? `open` : `close`"
        @click="selectIsActive = !selectIsActive"
      ></div>
    </div>
    <ul class="select__list" v-if="selectIsActive">
      <li class="select__item" @click="changeFilter(false)">
        По уменьшению цены
      </li>
      <li class="select__item" @click="changeFilter(true)">
        По увеличению цены
      </li>
    </ul>
  </div>
  <div>
    <button>Применить</button>
  </div>
</template>

<script setup lang="ts">
import { useProducts } from "../store/modules/product";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ROUTES_PATH } from "../constants/routes";
const router = useRouter();
const route = useRoute();
const storePinia = useProducts();
const changeFilter = (priceFilter) => {
  storePinia.filterProducts(priceFilter);
  if (priceFilter) {
    router.push({ query: { price: "up" } });
  } else {
    router.push({ query: { price: "down" } });
  }
};
const selectIsActive = ref<boolean>(false);
onMounted(() => {
  // console.log(route.query);
  // if (route.query.price == "down") {
  //   storePinia.getProducts(false);
  //   console.log("eqeqewqqe");
  // } else {
  //   storePinia.getProducts(true);
  // }
});
</script>

<style scoped lang="scss">
.select {
  position: relative;
  display: block;
  min-width: 220px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
}
.select-daw {
  width: 10px;
  height: 6px;
  background: #fff
    url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.50495 5.78413L0.205241 1.25827C-0.0684138 0.970375 -0.0684138 0.503596 0.205241 0.215836C0.478652 -0.0719461 0.922098 -0.071946 1.19549 0.215837L5.00007 4.22052L8.80452 0.215953C9.07805 -0.0718292 9.52145 -0.0718292 9.79486 0.215953C10.0684 0.503736 10.0684 0.970492 9.79486 1.25839L5.49508 5.78425C5.35831 5.92814 5.17925 6 5.00009 6C4.82085 6 4.64165 5.928 4.50495 5.78413Z' fill='%23ED266A'/%3E%3C/svg%3E%0A")
    no-repeat center / cover;
  position: absolute;
  right: 20px;
  bottom: 50%;
  transform: translateY(50%);
  content: "";
  display: block;
  transition: 0.2s ease-in;
}
.open {
  transform: translateY(50%) rotate(180deg);
}
.select__head {
  width: 100%;
  max-width: 100%;
  position: relative;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 14px 15px;
  font-size: 14px;
  line-height: 18px;
  color: rgba(66, 67, 72, 0.8);
  cursor: pointer;
}

// .select__head::after {
//   width: 10px;
//   height: 6px;
//   background: #fff
//     url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.50495 5.78413L0.205241 1.25827C-0.0684138 0.970375 -0.0684138 0.503596 0.205241 0.215836C0.478652 -0.0719461 0.922098 -0.071946 1.19549 0.215837L5.00007 4.22052L8.80452 0.215953C9.07805 -0.0718292 9.52145 -0.0718292 9.79486 0.215953C10.0684 0.503736 10.0684 0.970492 9.79486 1.25839L5.49508 5.78425C5.35831 5.92814 5.17925 6 5.00009 6C4.82085 6 4.64165 5.928 4.50495 5.78413Z' fill='%23ED266A'/%3E%3C/svg%3E%0A")
//     no-repeat center / cover;
//   position: absolute;
//   right: 20px;
//   bottom: 50%;
//   transform: translateY(50%);
//   content: "";
//   display: block;
//   transition: 0.2s ease-in;
// }

.select__head.open::after {
}

.select__list {
  display: block;
  //   position: absolute;
  //   top: 100%;
  //   left: 0;
  //   right: 0;
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-top: 5px;
  max-height: 205px;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 100;
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #424348;
  scrollbar-color: dark;
  scrollbar-width: thin;
  overscroll-behavior: contain;
}

.select__list::-webkit-scrollbar {
  width: 7px;
  background-color: #f8f9fa;
  padding: 5px;
}

.select__list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #d9d9d9;
}

.select__list .select__item {
  position: relative;
  border-top: 1px solid rgba(224, 229, 231, 0.5);
  padding: 10px 15px;
  cursor: pointer;
  list-style-type: none;
}

.select__list .select__item:hover {
  background-color: rgba(224, 229, 231, 0.5);
}
</style>
