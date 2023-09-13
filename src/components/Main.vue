<template>
    
    <Head :headerFixed="headerFixed"></Head>
<div class="container-custom mt-3"
:class="{ 'container_margin': headerFixed}">
    <div class="toggle_view">
        <button class="gorizontal_view btn_view" 
        @click="gorizontalView =true">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-grid-3x2-gap" viewBox="0 0 16 16">
   <path d="M4 4v2H2V4h2zm1 7V9a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 5V9a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 4v2H7V4h2zm5 0h-2v2h2V4zM4 9v2H2V9h2zm5 0v2H7V9h2zm5 0v2h-2V9h2zm-3-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-2z"/>
 </svg>
        </button>
        <button class="vertical_view btn_view" 
        @click="gorizontalView =false"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg> </button>
    </div>
    
    <Products ></Products>
    
     

</div>

</template>

<script setup lang="ts">


import Head from './Head.vue'
import Products from './Products.vue'
import {ref,provide,onMounted} from 'vue'


import { useProducts} from '../store/modules/product' 
    //varible header_bool for Head.vue 
    onMounted(() => {
    window.addEventListener('scroll',handleScroll)
   })
 
   let headerFixed = ref<boolean>(false)
   const handleScroll = ()=>{
   
    headerFixed.value = window.scrollY> 90? true: false
    
   
    
   }
    const storePinia = useProducts()
    
        const gorizontalView  = ref<boolean>(true)
        //gorizontalView injected to Card.vue. gV defines the view of Products
        provide('gorizontalView',gorizontalView )
    

        onMounted(() => {
            storePinia.getProducts()
            storePinia.calculatePrice()
                
        
    })


</script>

<style lang="scss">

.container_margin{
    margin-top: 90px !important;
}
.btn_view{
    margin-right: 5px;
    background-color: white;
    border: 1px solid black;
    
}



</style>
