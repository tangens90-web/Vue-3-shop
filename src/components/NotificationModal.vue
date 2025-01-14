<template>
  <modals-form
    @mouseover="setCursorOverModal(true)"
    @mouseleave="setCursorOverModal(false)"
  >
    <div class="shortNotifications">
      <div class="d-flex justify-content-between">
        <div>
          <div>Получайте бонусы, сохраняйте и отслеживайте заказы.</div>
          <div>
            <div class="btn btn-enter" @click="sendToRegisterLink()">Войти</div>
          </div>
          <div>Узнать статус заказа</div>
          <div>Обратная связь</div>
          <div>Обмен, возврат, гарантия</div>
        </div>
      </div>
    </div>
  </modals-form>
  <div class="modalBackground"></div>
</template>

<script setup lang="ts">
import ModalsForm from "@/components/ModalsForm.vue";
import { reactive, toRefs, onMounted, computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const sendToRegisterLink = () => {
  router.push("/registration");
};
const props = defineProps({
  showModal: Boolean,
});
const setCursorOverModal = (bool: boolean): void => {
  emit("closeOpenedNotificationModal", bool);
};
const emit = defineEmits(["closeOpenedNotificationModal"]);

onMounted(() => {});
</script>

<style lang="scss" scoped>
@import url("@/styles/shortNotifications.scss");
.shortNotifications {
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
  top: -200px;
  background-color: black;
  z-index: 80;
  opacity: 0.5;
  left: -500px;
}
</style>
