<template>
  <div>
    <h4>Category</h4>
    <div class="list-group">
    <div class="mb-2" v-for="(category,i) in categories" :key="i" >
      
      <router-link class="list-group-item" active-class="active" target='_blank' :to="{name: 'shop', params:{category: `${category}`} }">{{category}}</router-link>
    
      
    
  </div>

    </div>
  </div>
    
</template>

<script>
import { useStore } from 'vuex';
import {computed} from 'vue';
export default {
    props: {
        propName: {
            type: Number,
            default: 5
        },
    },
    setup(){

      const store = useStore()
      // console.log(store.getters.category)
      const categories = computed(() =>  store.getters.category
    
    
)
      return {
        categories
      }
    }
}
</script>

<style>
.list-group-item{
  font-size: 20px;
  color: yellowgreen;
  text-decoration: none !important;
}
</style>