<template>
  <div class="modals_class">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onMounted, computed, ref, watch } from "vue";
</script>

<style lang="scss" scoped></style>
