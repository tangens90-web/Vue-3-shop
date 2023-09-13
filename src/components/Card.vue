<template>



  <div
    class="cards d-flex wrap mr-5 mb-3"
    
    v-for="product in products"
    :key="product.id"
  >
  
    <div
      @mouseover="showRectangleBlock(product.id)"
      @mouseout="closeRectangleBlock(product.id)"
      class="card mb-3 scaleCard"
      style="border-radius:15px;"
      :style="gorizontalView  ? `max-width: 1000px;` : `max-width: 18rem;`"
    >
     
      <div class="row no-gutters">
        
        <div 
       
        :class="gorizontalView ? `image-block col-md-4`:`image-block`">
           <div 
            
           >
           
          <img 
          @mousemove="changeImage(product.id,product.img, $event)" 
          style="border-radius:15px;"
          :ref="(el)=>images[product.id]=el"
            :src="getImageUrl(product.img[0])"
            class="img-height"
            alt="..."
            loading="lazy"
          />
        </div> 
          
  <div class="image-block__attributes" >
     
      <div 
      class="image-block__rectangle-block d-flex justify-content-center rect_block"
     
      :ref="(el) =>rectangleBlock[product.id] = el"

       >
        <div
          class="rectangle"
          v-for="(item,index) in product.img.length"
          :key="index"
          :class="{ green_rect :item===1}"
          ></div>
          </div>
          <div
        v-if="product.id < 5"
        class="image-block__new-product trademark"
        :class="{ active: checkWishList(product.id) }"
      >
        новое
      </div>
      <div
        v-if="product.id > 5"
        class="image-block__best-product trademark"
        :class="{ active: checkWishList(product.id) }"
      >
        лучшее
      </div>
          <div
        class="image-block__icon-heart"
        :class="{ active: checkWishList(product.id) }"
        @click="changeWishList(product, $event)"
      ></div>
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
            <div class="button_class" >
              
              <button
                :disabled="checkCartItem(product.id)"
                class="btn btn-primary"
                @click="addToCartItem(product, $event)"
              >
                <div class="button_text">
                {{ buttonText(product.id) }}
              </div>
                <span
                :ref="
                  (el) => {
                    spans[product.id] = el;
                  }
                "
                v-show="!checkCartItem(product.id)"
              >
                <div class="daw_block">
                  <div id="check-part-1" class="check-sign"></div>
                  <div id="check-part-2" class="check-sign"></div>
                </div>
              </span>
              </button>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, inject, toRefs, computed, ref,onMounted } from "vue";

import { useRoute } from "vue-router";
import {Product, ImageUrls} from '../types/product'
import { useProducts } from '../store/modules/product' 
    






    const storePinia = useProducts()
    
    
    
// import autoAnimate from "@formkit/auto-animate"

   //Image Slider
  
  //  interface Product extends Url {
  // id:number,
  // title:string,
  
  // urls:Url[]
// }
// interface Url{
//   urls:string[]
// }

// const someTests = [
//   "eqeqe",
//   "eqeqeqe",
//   "ttqtqtq",
//   "tqtqt"
//   ] as const
// type RecomTests = typeof someTests[number]
// let test = ref<RecomTests>("eqeqe")




// let array : Product[] = [{id:1,title:"erqrqr",url:["eqeqeq",4,"414141"]},
// {id:2,title:"erqrqr",url:["eqeqeq",44,"414141"]}]


// let ur :ImageUrls ={
//   url:["eqeqeq","twwtwt"]
// }


    const changeImage=(id:number,imageUrls:ImageUrls["url"],e:(Event| MouseEvent)):void =>{
       console.log();
       
      let imageQuantity:number = imageUrls.length
      let currentImageNumber = findCurrentImageNumber(e,imageQuantity)
      
      let rects = rectangleBlock.value[id].querySelectorAll('.rectangle')
          
          
          for (let i = 0; i < rects.length; i++) {
            if(rects[i].classList.contains('green_rect')){
              rects[i].classList.remove('green_rect')
              break;
            }
          }
        images.value[id].src = getImageUrl(imageUrls[currentImageNumber])
        rects[currentImageNumber].classList.add('green_rect')
        
    
    }
    const findCurrentImageNumber =(e:Event| MouseEvent,n:number):number=>{
      let target = e.target as Element
      let event = e as MouseEvent
      const imageCoordinates = target.getBoundingClientRect()
      const mouseRelativeCoordinates: number  = event.clientX -imageCoordinates.x
      
      
      
      const otn:number = mouseRelativeCoordinates/imageCoordinates.width
      let abs:number = Number((1/n).toFixed(2))
      for (let i = 0; i < n; i++) {
        
        if(otn>abs){
          abs += 1/n
        }
       
      }
      let currentImageNumber:number = Number((abs*n).toFixed(0))
      
      return currentImageNumber-1
      
    }
    
    const rectangleBlock = ref<any[]>([])
    const showRectangleBlock=(id:number):void=> {
        
      rectangleBlock.value[id].classList.add('visible-block')
      
    }
    const closeRectangleBlock=(id:number):void=> {
        
      rectangleBlock.value[id].classList.remove('visible-block')
      
    }
 
    //gorizontalView provided from Main.vue
    const gorizontalView = inject<boolean>("gorizontalView");
    

    const route = useRoute();
   
    const spans = ref<any[]>([]);
    const images = ref<any[]>([])

    
    enum ButtonText {
      Add= "Add To CartItem",
      Added= "Added in CartItem",
      InCart = "Already in CartItem"
    }
    const cartItemText = {  
      0: ButtonText.Add,
      1: ButtonText.Added,
      2: ButtonText.InCart,
    };

    const buttonText = (id:number): string => {
      return checkCartItem(id) ? cartItemText[2] : cartItemText[0];
    };

    
    const products = computed(() => {
      
      return route.params.category == undefined
        ? storePinia.products
        : storePinia.products.filter(
            (item:Product) => item.category == route.params.category
          );
    });

    const getImageUrl = (name:string):string => {
      return new URL(`../${name}`, import.meta.url).href;
    };

    // WishList
    const checkWishList = (id:number):boolean => {
      let wishList = localStorage.getItem("wishList") || [];
      if (wishList.length > 0 && typeof wishList === 'string') {
        return JSON.parse(wishList).findIndex((item:Product) => item.id == id) !== -1
          ? true
          : false;
      } else {
        return false;
      }
    };
    const changeWishList = (product:Product, event:Event):void => {
      let target = event.target as Element
      if (target.classList.contains("active")) {
        target.classList.remove("active");

        storePinia.removeFromWishList(product) ;
      } else {
        target.classList.add("active");
        storePinia.addToWishList(product) ;
      }
    };
    // CartItem
    const checkCartItem = (id:number): boolean => {
      let cartItem = localStorage.getItem("cart") || [];

      if (cartItem.length > 0 && typeof cartItem === 'string') return JSON.parse(cartItem).findIndex((item:Product) => item.id == id) !== -1?true:false
        
          
       else return false;
        
      
    };

    const addToCartItem = (product:Product, event:Event):void => {
      let currentTarget = event.currentTarget as Element
        
      
      currentTarget.classList.add("btn-padding");
     
      spans.value[product.id].classList.add("spanInButton");
      
      currentTarget.querySelector<HTMLElement>('.button_text').innerText=cartItemText[1]
      
      currentTarget?.setAttribute('disabled', '');
      
      storePinia.addToCart(product)
      
    };


 



</script>

<style lang="scss" scoped>
@import url("@/styles/check-sign.scss");
@import url("@/styles/arrows.scss");

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
.rectangle{
  display: block;
  width: 30px;
  height: 10px;
  border: 1px solid black;
  margin: 1px;
  background-color: white;
}
.green_rect{
  background-color: yellowgreen;
}
.trademark{
  position: absolute;
  display: block;
  width: 75px;
  height: 30px;
  z-index: 15;
  top: 10px;
  left: 5px;
  border: 1px solid white;
}
.image-block__new-product {
  color: white;
  background-color: red;
  
}
.image-block__best-product{
    background-color: greenyellow;
    color: black;
}


.image-block__icon-heart {
  width: 100px;
  height: 100px;
  position: absolute;
  left: auto;
  right: -10px;
  top: -20px;
  transform: translate(0%, 0%);
  background: url("http://bintaga.ru/local/templates/bintaga/images/icons/img_favorite_icon.png")
    no-repeat;
  background-position: 0 0;
  cursor: pointer;
}

.image-block__icon-heart.active {
  background-position: -2800px 0;
  transition: background 1s steps(28);
  animation: fave-heart 1s steps(28);
}

// span
.button_class {
  position: relative;
}


.btn-padding {
  padding-right: 30px;
}



@keyframes fave-heart {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -2800px 0;
  }
}
</style>
