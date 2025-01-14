<template>
  <div class="search_block">
    <FormKit
      v-model="testingValue"
      type="checkbox"
      label="Trim extras"
      :options="{
        650: 'Leather seats ($650)',
        1200: 'Sweet rims ($1,200)',
        13250: 'Gold leaf ($13,250)',
        500: 'Massaging seats ($500)',
      }"
      help="Configure your car’s trim options"
    />
    <FormKit
      v-model="value"
      type="checkbox"
      label="Characters"
      :options="{
        Jett: 'Джетт',
        Killjoy: 'Киллджой',
        Reyna: 'Рейна',
        Cypher: 'Сайфер',
      }"
      help="Выберите агента"
    />
    <div class="price_block">
      <FormKit
        type="number"
        help="What temperature should the house be?"
        label="Thermostat"
        name="temperature"
        value="25"
        step="1"
      />
      <FormKit
        type="number"
        help="What temperature should the house be?"
        label="Thermostat"
        name="temperature"
        value="25"
        step="1"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { watchEffect, ref } from "vue";

const testingValue = ref();

watchEffect(() => {
  console.log(testingValue.value);
});

const isNumberKey = (evt) => {
  let charCode = evt.which ? evt.which : evt.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57))
  return charCode > 31 && (charCode < 48 || charCode > 57) ? false : true;
  //   return true;
};
</script>
<style lang="scss" scoped>
input[type="number"] {
  width: 100px;
}
</style>
