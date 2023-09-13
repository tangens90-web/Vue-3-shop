<template>
  <div class="d-none d-sm-block">
    <div class="left_block">
            <div class="container_left_block">
            
            
            
            <div class="categories_class" ref="categories_class">
                <h4>Категории</h4> 
     <div class="list-group">
    <div class="mb-2" v-for="(item,i) in category" :key="i" >
      
      <router-link class="list-group-item" active-class="active" target='_blank' :to="{name: 'shop', params:{category: `${item}`} }">{{item}}</router-link>
      
      
    
  </div>
  
  

    </div>
               
           
            </div>
       
    </div>
        </div>
   
    
    
 
    <!-- <Search></Search> -->
  </div>
    
</template>

<script setup lang="ts">
import Search from './Search.vue'

import {computed,ref,onMounted} from 'vue';
import autoAnimate from "@formkit/auto-animate"
import { useProducts } from '../store/modules/product';
import { useAutoAnimate } from '@formkit/auto-animate/vue';
    const [categories] = useAutoAnimate()
    const showCategories = ref<boolean>(false)

      const storePinia = useProducts()
    
      
      const category = computed(()=>storePinia.category)

    
    
    
    
  
   
    

onMounted(() => {
  storePinia.getProducts()
  storePinia.reduceCategories()
  

})
      

</script>

<style>
.list-group-item{
  font-size: 20px;
  color: yellowgreen;
  text-decoration: none !important;

}
.left_block {
    width: 280px;
    background-color: white;
    height: 100vh;
        
    /* color: var(--white-color); */
   
    
}
.nav{
    
}
.nav_items{
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.nav_item-btn{
    width: 150px;
    height: 54px;
    top: 120px;
    left: 80px;
    padding: 12px 56px 12px 56px;
    border-radius: 16px;
    background-color: var(--grey-color);
    
    

}
.nav_item_inner{
    display: flex;
    justify-content: left;
    gap:10px;
    list-style-type: none;
    
}
.categories_class{
    width: 100%;
}
.category_item{
    text-align: left;
}
</style>