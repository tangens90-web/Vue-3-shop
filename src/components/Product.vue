<template>
    <Head></Head>
    
    <div class="container-sm ">
    <div
    class="cards  d-flex wrap mr-5 mt-5 mb-3"
    
    
    v-for="product in products"
    :key="product.id"
  >
    <div 
     
      class="card mb-3  scaleCard"
      style="border-radius:15px; max-width: 1000px; max-height: 300px;"
      
    >
     
      <div class="row no-gutters col-md-4 d-flex flex-row">
        
        <div 
       
            class="image-block col-md-4">
            <div class="carousel_images mr-2 d-flex flex-column">

                <div class="carousel_image" v-for="(imageUrl,index) in product.img" :class="{active:index==0}"
                :ref="(el)=>carouselImages[index]=el"> 
                    <img 

          @mouseenter="changeMainImage(imageUrl,index, product.img.length)" 
          style="border-radius:15px;"
          :ref="(el)=>images[product.id]=el"
            :src="getImageUrl(product.img[index])"
            class="carousel_image_img"
            :class="getClassName(index)"
            alt="..."
            loading="lazy"
          />
        </div> </div>
            </div>

           <div  class="main_image_container col-md"
            
           >
           
          <img 
          
          style="border-radius:15px;"
          :ref="(el)=>images[product.id]=el"
            :src="getImageUrl(product.img[0])"
            class="img-height"
            id="mainImage"
            alt="..."
            loading="lazy"
          />
        </div> 
          
  
        </div>
        
        <div class="col-md">
          <div class="card-body">
            
          <h4 class="card-title">{{ product.title }}</h4>
            <p class="card-text">{{ product.desc }}</p>
            <p class="card-text">Price: {{ product.price }} руб</p>
           
          </div>
        </div>
      </div>
    </div>
  </div>







    
</template>

<script setup lang="ts">
import {ref, computed,onMounted, watch} from 'vue'
import Head from "./Head.vue"


import { useRouter,useRoute } from 'vue-router'
import {Product, ImageUrls} from '../types/product'
import { useProducts } from '../store/modules/product' 
    
    
const carouselImages = ref<any[]>([])
const images = ref<any[]>([])
const rectangleBlock = ref<any[]>([])
const getClassName = (i:number):string=>{
    return `"carousel_image_"${i}`
}
const changeMainImage= (url:string,index:number, length:number):void=>{
  let mainImage = <HTMLImageElement>document.getElementById('mainImage')
    
    
    for (let i = 0; i < length; i++) {
      if (carouselImages.value[i].classList.contains('active')) {
        carouselImages.value[i].classList.remove('active')
        break;
      }
      
      
      
      
    }
  carouselImages.value[index].classList.add('active')
  mainImage.src = getImageUrl(url)
  
  
}
const getImageUrl = (name:string):string => {
                return new URL(`../${name}`, import.meta.url).href }



    
   
    
    
        // const router = useRouter()
        const route = useRoute();
       
        
       
        
        const storePinia = useProducts()
       
        storePinia.getProducts()
        
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
            return storePinia.products.filter(item=>item.id==Number(route.params.id))
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
.active{
  border: 2px solid greenyellow;
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
.card{
  flex-direction: row !important;
  
}
.row{
  flex-wrap: nowrap !important;
}
//carousel-images
.carousel_image{
  display: block;
  width:50px;
  height: 50px;
  
}
.carousel_image_img{
  width: 100%;
  height: 100%;
}
.image-block{
    position:relative;
    height: 100%;
    overflow-y: scroll;
    // width: 25%;
    // height: 100%;
}
.main_image_container{
  width: 100%;
  height: 100%;
  margin-top: 30px;
}
.img-height {
    width: 100%;
    height: 80%;
    
    
}
.card-body{
  margin-top: 30px;
}

</style>