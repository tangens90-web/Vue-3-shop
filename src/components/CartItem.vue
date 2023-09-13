<template>
    <Head></Head>
    <h3>Total Price {{price.toFixed(2)}} $</h3>
    <div class="container-sm ">
    <div
    class="cards d-flex wrap mr-5 mb-3"
    
    v-for="product in products"
    :key="product.id"
  >
  
  
    <div
     
      class="card mb-3 scaleCard"
      style="border-radius:15px; max-width: 1000px;"
      
    >
     
      <div class="row no-gutters">
        
        <div 
       
        class="image-block col-md-4">
            <div class="carousel_images">

            </div>

           <div 
            
           >
           
          <img 
         
          style="border-radius:15px;"
          
            :src="getImageUrl(product.img[0])"
            class="img-height"
            alt="..."
            loading="lazy"
          />
        </div> 
          
  
        </div>
        <!-- </div> -->
        <div class="col-md">
          <div class="card-body">
            <router-link  
            :to="{name: 'oneProduct', params:{id: `${product.id}`} }"> 
            <h4 class="card-title">{{ product.title }}</h4>
          </router-link>
            
            <p class="card-text">{{ product.desc }}</p>
            <p class="card-text">Price: {{ product.price }} руб</p>
            <div class="button_class">
                <div class="class d-flex justify-content-center">
                    <button 
                      class="btn btn-primary"
                      :disabled="(product.quantity>=3)"
                      @click="increaseProduct(product)">+</button
                      
                    >
                 <button class="btn btn-primary" :disabled="(product.quantity<=1)"  @click="decreaseProduct(product)">-</button>
                 
                <button class="btn btn-danger"  @click="removeFromCart(product)">Remove from Cart</button>
                

                
            </div>
             
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>






    
</template>

<script setup lang="ts">
import {ref, computed,onMounted, watch} from 'vue'
import Head from "./Head.vue"


import { useRouter } from 'vue-router'

import { useProducts } from '../store/modules/product' 
    

    
        const router = useRouter()

       
        
       
        
        
        const storePinia = useProducts()
        const getImageUrl = (name:string):string => {
                return new URL(`../${name}`, import.meta.url).href }
                storePinia.loadCart()
        const increaseProduct=(product)=>{
          storePinia.increaseProduct(product)
        }
        const decreaseProduct=(product)=>{
          storePinia.decreaseProduct(product)
        }
        const removeFromCart =(product)=>{
          storePinia.removeFromCart(product)
        }
        const products = computed(()=>{

            return storePinia.cart}
)
            const price = computed(()=>{
                return storePinia.price
            })

            onMounted(() => {
              storePinia.calculatePrice()
    })
    watch(products,()=>{
      storePinia.calculatePrice()
    },
    {deep:true})
        
   
</script>

<style lang="scss" scoped>
.scaleCard {
  &:hover {
    box-shadow: 8px 10px 5px 2px rgba(0, 0, 255, .2);
  }
  .rect_block{
    opacity: 1;
  }
  .visible-block{
    opacity: 1;
  }
}
a{
  text-decoration: none;
  color: black;
}
.card-title{
  &:hover{
    cursor: pointer;
    color: yellowgreen;

  }
}
.image-block{
    position:relative;
    // width: 25%;
    // height: 100%;
}
.img-height {
    width: 100%;
    height: 250px;
    
}

</style>