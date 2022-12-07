<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="col-3" @click="sendToMajorPage()">
            <h3>Logo</h3></div>
            
            
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation"> 
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <button type="button" class="btn btn-purple ml-2 mt-1" @click="sendToWishList()" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg> Wishlist</button>
      </li>
      <li class="nav-item">
        <button type="button" class="btn btn-purple ml-2 mt-1" @click="sendToCartItem()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg> Your Cart {{cartLength}}</button>
      </li>
      <li class="nav-item">
        <div class="avatar ml-2">
                        <div class="rounded-circle border d-flex justify-content-center align-items-center"
             style="width:50px;height:50px"
          alt="Avatar">
        
        </div>
                    
                </div>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    <div class="row justify-content-end mr-5">
                    
                
               
                    
                  
                
                  
            </div>
    
  </div>
</nav>
    
</template>

<script>
    import { reactive, toRefs, computed } from 'vue'
    import { useRouter } from 'vue-router';
    import {useStore} from 'vuex'
   
    export default {
       
        setup () {
           
            const router = useRouter()
            function sendToMajorPage() {
                router.push('./')
            }
            const sendToWishList=()=>{
                router.push('./wishlist')
            }
            const sendToCartItem=()=>{
                router.push('./cartitem')
            }
           
            const store = useStore()
        const cartLength = computed(()=>store.getters.cart.length || 0)
            return {
                
                sendToMajorPage,

                sendToCartItem,

                cartLength,

            }
        }
    }
</script>

<style lang="scss" scoped>
    .col-3{
        cursor: pointer;
    }
    .btn-purple{
        background-color: plum;
    }
</style>