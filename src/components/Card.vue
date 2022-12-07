<template>
    
  <div class="cards d-flex wrap mr-5 mb-3 " v-for="product in products" :key="product.id">
                 <!-- <p>{{name}}</p> -->
                 <div class="card" style="width: 18rem;">
                    <div class="iconHeart" :class="{active:checkWishList(product.id)}" @click="changeWishList(product,$event)"></div>
                <img :src="getImageUrl(product.img)" class="img-fluid img-height" alt="...">
                <div class="card-body"> 
                <h5 class="card-title">{{product.title}}</h5>
                <p class="card-text">{{product.desc}}</p>
                <p class="card-text">Price: {{product.price}} $</p>
                <div class="button_class">
                <button :disabled="checkCartItem(product.id)" class="btn btn-primary"  @click="addToCartItem(product,$event)">{{buttonText(product.id)}}</button>
                <span :ref="el=>{spans[product.id] = el}" v-show="!checkCartItem(product.id)">
                    
                    <div class="wrap">
                        <div id="check-part-1" class="check-sign"></div>
                        <div id="check-part-2" class="check-sign"></div>
                    </div>

                </span>
            </div>

  </div>
</div>

                        
                    </div>
</template>

<script>
        
        
        import { reactive, toRefs,computed, ref } from 'vue'
        import { useStore } from 'vuex';
        import {useRoute} from 'vue-router'
        export default {
           
            
            setup () {
                
               
                
                
                const route = useRoute()
                const store = useStore()
                const spans = ref([])
                const cartItemText = reactive({
                    0:'Add To CartItem',
                    1:'Added in CartItem',
                    2:'Already in CartItem'})
               
                const buttonText = (id)=>{
                   return checkCartItem(id)? cartItemText[2]:cartItemText[0]
                    
                }
                
                
                const products = computed(()=>{

                    return route.params.category==undefined?store.getters.products: store.getters.products.filter(item=>item.category==route.params.category)}
                )
            
                const getImageUrl = (name) => {
                return new URL(`../${name}`, import.meta.url).href }
                
                
                // WishList
                const checkWishList = (id)=>{
                   let wishList =  localStorage.getItem('wishList')
                   if(wishList.length>0 ){
                        return JSON.parse(wishList).findIndex(item=>item.id==id)!==-1? true:false
                    }else{
                        return false
                    }
               
                       
                    
                }
                const changeWishList = (product,event)=>{

                    if(event.target.classList.contains('active')){
                        
                        event.target.classList.remove('active')
                        
                        store.dispatch('removeFromWishList',product)
                    }
                    else{
                        event.target.classList.add('active')
                        store.dispatch('addToWishList',product)
                    }
                    
                }
                // CartItem
                const checkCartItem = (id)=>{
                   let cartItem =  localStorage.getItem('cart') || []
                 
                    if(cartItem.length>0 ){
                        return JSON.parse(cartItem).findIndex(item=>item.id==id)!==-1? true:false
                    }else{
                        return false
                    }

                }
               
              
                const addToCartItem = (product,e)=> {
                    console.log(spans.value[product.id])
                    e.target.classList.add('btn-padding')
                    spans.value[product.id].classList.add('spanInButton')
                    
                    e.target.innerText = cartItemText[1]
                    e.target.disabled = true

                store.dispatch('addToCart',product)
               
        }
 
                return {
                    
                    spans,
                    products,
                    cartItemText,
                    
                    buttonText,
                    checkWishList,
                    changeWishList,
                    getImageUrl,
                    checkCartItem,
                    addToCartItem,
                }
            }
        
    }

</script>

<style lang="scss" scoped>


 
 
.iconHeart {
    width: 100px;
    height: 100px;
    position: absolute;
    left: auto;
    right: -10px;
    top: -20px;
    transform: translate(0%, 0%);
    background: url("http://bintaga.ru/local/templates/bintaga/images/icons/img_favorite_icon.png") no-repeat;
    background-position: 0 0;
    cursor: pointer;
}

.iconHeart.active {
    background-position: -2800px 0;
    transition: background 1s steps(28);
    animation: fave-heart 1s steps(28);
}
// span
.button_class{
    position:relative;
}

.btn-padding{
    padding-right:30px
}


.img-height{
    width:300px;
    height: 200px;
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