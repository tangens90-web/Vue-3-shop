<template>
    <div class="container-fluid" >
        <div class="row justify-content-md-center">
            <div class="col-3 col_3_medium_size">
                <aside-block></aside-block>
            </div>
            <div class="col col_medium_size">
                <div class="row">
                    <Card></Card>   
            </div>
        </div>
            </div>
        </div>
           
    

</template>

<script setup lang="ts">

import {ref,toRefs,computed,onMounted} from 'vue'
import AsideBlock from '@/components/AsideBlock.vue'
import Card from '@/components/Card.vue'
import { useProducts } from '../store/modules/product' 

        
  

        
        const storePinia = useProducts()
        
        
        
        
        
        onMounted(() => {
            storePinia.getProducts()
            storePinia.loadWishList()
            storePinia.loadCart()
            })
       
        
        
       
       

</script>

<style lang="scss" scoped>
.col_3_medium_size{
    @media (max-width:1000px){
        display: none;
    }
}
.col_medium_size{
    @media (max-width:1000px){
        width: 100%;
    }
}

  
</style>
