<template>
  <header class="header_class" 
  :class="{ 'header_class_fixed': headerFixed}"
  ref="header_ref">
   <div class="container-custom">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="col-3" @click="sendToMajorPage()">
            <h3 >Логотип</h3></div>
            
            <!-- <Icon icon="bi:3-circle"
            width ="96" /> -->
            
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation"> 
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0 ">
      <li class="nav-item  active">
        <div class="d-flex flex-column">
        <div class="svg_class svg" 
        
        @click="sendToWishList()" >
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
      <path :d="`${heartSvg.path}`"/>
    </svg> <div class="svg_class text">Wishlist</div></div>
  </div>
      </li>
      <li class="nav-item active">
        <div class="d-flex flex-column" @click="sendToCartItem()">
        <div class="svg_class svg" 
        
        @click="sendToCartItem()" 
        @mouseenter="openShortCI"
        @mouseleave="closeShortCITimer"
       >
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
      <path :d="`${cartSvg.path}`"/>

    </svg>
     <div class="svg_class text" v-if="cartLength==0">CartItem </div>
     <div class="svg_class text" v-else>{{price}} руб </div></div>
  </div>
  
        <ShortCartItem 
            v-if="(shortCI)&&(cartLength>0)&& NotificationModal!==true " 
            @closeOpenedShortCI = "closeOpenedShortCI"
            
            >
        </ShortCartItem>
        
      </li>
    
     
      
      <li class="nav-item active">
        <div class="d-flex flex-column" @click="sendToUserSet()">
        <div class="svg_class svg"  
        @click="sendToUserSet()"
        @mouseenter="openNotificationModal"
        @mouseleave="closeNotificationModalTimer"
         ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
          <path :d="`${accountSvg.path}`"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          
    </svg> <div class="svg_class text">Enter </div>
    
  </div>
  </div>
  <Notifications 
            v-if="NotificationModal&& shortCI!==true " 
            @closeOpenedNotificationModal = "closeOpenedNotificationModal"
            
            >
        </Notifications>
      </li>
     
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    
    
  </div>
</nav>
</div>
</header>
</template>

<script setup lang="ts">
   
    import { Icon } from '@iconify/vue';
    import { reactive, toRefs, onMounted, computed,ref,watch } from 'vue'
    import { useRouter } from 'vue-router';
    import {defineAsyncComponent} from 'vue'
    // import ShortCartItem from "./ShortCartItem.vue"
    // import Notifications from "./NotificationModal.vue"
     import { useProducts } from '../store/modules/product' 
     const ShortCartItem = defineAsyncComponent(() =>
      import("./ShortCartItem.vue")
  )
    const Notifications = defineAsyncComponent(() =>
  import("./NotificationModal.vue")
)
    const props = defineProps({
      headerFixed:Boolean}
      
    )
  
 
   
    const price = computed(()=>storePinia.calcPrice)
          //Opening and closing modals
          // shortCartItem == shortCI 
            const shortCI = ref<boolean>(false) 
            
            let timer:number; 
            const openedShortCI = ref<boolean>(false)
            const openShortCI = ():void=>{
              console.log(timer);
              clearTimeout(timer)
              
              shortCI.value=true
            }
            const closeShortCITimer = ():void=>{
              timer = setTimeout(()=>{
                console.log("timer",shortCI.value,openedShortCI.value);
                console.log("time is here");
                closeShortCI()
              },1000)
            }
            const closeShortCI=():void=>{
              shortCI.value = false
            }
            
          
            const closeOpenedShortCI=(bool:boolean):void=>{
              openedShortCI.value = bool
              console.log('its here');
            }
            
            watch(openedShortCI,(newValue:boolean)=>{
              console.log("it's working");
              if(newValue) clearTimeout(timer)
                
                
              
              else closeShortCITimer()
                
              
            })
            //NotificationModal
            const NotificationModal = ref<boolean>(false) 
            
            let time:number; 
            const openedNotModal = ref<boolean>(false)
            const openNotificationModal = ():void=>{
              console.log(time);
              clearTimeout(time)
              
              NotificationModal.value=true
            }
            const closeNotificationModalTimer = ():void=>{
              time = setTimeout(()=>{
                console.log("time", NotificationModal.value,openedNotModal.value);
                console.log("time is here");
                
                closeNotificationModal()
              },1000)
              console.log();
              
            }
            const closeNotificationModal=():void=>{
              NotificationModal.value = false
            }
            
          
            const closeOpenedNotificationModal=(bool:boolean):void=>{
              openedNotModal.value = bool
              console.log('its here');
            }
            
            watch(openedNotModal,(newValue)=>{
              console.log("it's working");
              if(newValue) clearTimeout(time)
              else closeNotificationModalTimer()

            })





            
            const heartSvg= ref({
              path:"m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
            })
            const cartSvg= ref({
              path:"M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
            })
            const accountSvg = ref({path:"M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"})
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid-3x2-gap" viewBox="0 0 16 16">
//   <path d="M4 4v2H2V4h2zm1 7V9a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 5V9a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 4v2H7V4h2zm5 0h-2v2h2V4zM4 9v2H2V9h2zm5 0v2H7V9h2zm5 0v2h-2V9h2zm-3-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-2z"/>
// </svg>

            const router = useRouter()
            const sendToMajorPage=()=> {
                router.push('/')
                
            }
            const sendToWishList=()=>{
                router.push('/wishlist')
            }
            const sendToCartItem=()=>{
                router.push('/cartitem')
            }
            const sendToUserSet=()=>{
                router.push('/user')
            }
           
          
            
            const storePinia = useProducts()
        const cartLength = computed(()=>storePinia.cart.length || 0)
        
    // const price = computed(()=>{return store.getters.price}) 
</script>

<style lang="scss" scoped>

@import url("@/styles/nmarket.scss");
.header_class{
  width: 100%;

  &_fixed{
    position:fixed;
    top: 0;
  
  z-index: 100;
  }
  
  
}
// .navbar {
//   position: fixed;
// }
.col-3 {
        cursor: pointer;
    }
    .nav-item {
      margin-right: 10px;
      &:hover{
      cursor: pointer;
      
      }
      
      
    }
    .svg_class {
      padding-top: 10px;
     
      
    }
   
.btn-purple {
        background-color: plum;
    }
</style>