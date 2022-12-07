import Products from "../../axios/products"

function updateLocalStorage(cart) {

    localStorage.setItem('cart', JSON.stringify(cart))
  }
  function updateLocalStorageWish(wishList) {
    
    localStorage.setItem('wishList', JSON.stringify(wishList))
  }
    
export default {
    state: () => ({
        products : [],
        category: [],
        cart: [],
        wishList:[],
        maxQuantity:3,
        price:0
        
    }),
    getters: {
        products : state => state.products,
        category : state => state.category,
        cart: state=>state.cart,
        wishList: state=>state.wishList,
        price: state=>state.price
    },
    mutations: {

        
            getproduct(state, data) {
                
                state.products = data.products 
                
                // defineCategories

                state.category = state.products.reduce((value,item)=>{
                  if(!value.includes(item.category)) {
                    value.push(item.category)
                  } 
                  return value
                },[])
                
                
            },
            // Cart Item
            loadCart(state, cart ){
                state.cart = cart
               
                
            },
            addToCart(state,product){
                let item = state.cart.find(i=>i.id==product.id)
                if(item){
                    item.quantity++
                }
                else{
                    state.cart.push({...product,quantity:1})
                }
                updateLocalStorage(state.cart)
                
                
            },
            removeFromCart(state,product){
                let index = state.cart.findIndex(i=>i.id == product.id)
                if(index !==-1){
                    state.cart.splice(index,1)
                }
                updateLocalStorage(state.cart)
            },
            increaseProduct(state,product){
                let item = state.cart.find(i=>i.id==product.id)
                if(item){
                    if(item.quantity< state.maxQuantity){
                    item.quantity++
                }
                }
                
                updateLocalStorage(state.cart)
            },
            decreaseProduct(state,product){
                let item = state.cart.find(i=>i.id==product.id)
                
                
                if(item){
                    if(item.quantity>1){
                      item.quantity--  
                    }
                }
                
                updateLocalStorage(state.cart)
            },
            calcPrice(state,product){
                state.price = state.cart.reduce((value,item)=>{
                    value += item.quantity*item.price
                    return value },0)
            },
            // WishList
            
            loadWishList(state, wishList ){
                state.wishList = wishList
                
                
                
            },
            addToWishList(state,product){
                let item = state.wishList.find(i=>i.id==product.id)
                if(item){
                    item.quantity++
                }
                else{
                    state.wishList.push({...product,quantity:1})
                }
                updateLocalStorageWish(state.wishList)
                
                
            },
            removeFromWishList(state,product){
                let index = state.wishList.findIndex(i=>i.id == product.id)
                if(index !==-1){
                    state.wishList.splice(index,1)
                }
                updateLocalStorageWish(state.wishList)
            },
            
            
            
           
       
    },
    actions: {
        async getProducts({commit}){
            let data = await Products.getProducts()
            
            commit('getproduct',data)
        },
        //cartItem
        async loadCart({commit}){
            
            
            let cart = localStorage.getItem('cart') || []
            if (cart.length>0) {
              cart = JSON.parse(cart)
            }
            commit('loadCart',cart)
        },
        async addToCart({commit},product){
            commit('addToCart',product)
        },
        async removeFromCart({commit},product){
            commit('removeFromCart',product)
        },
        async increaseProduct({commit},product){
            commit('increaseProduct',product)
        },
        async decreaseProduct({commit},product){
            commit('decreaseProduct',product)
        },
        
        // WishList
        async loadWishList({commit}){
            
            
            let wishList = localStorage.getItem('wishList') || []
            if (wishList) {
                wishList = JSON.parse(wishList)
            }
            commit('loadWishList',wishList)
        },
        async addToWishList({commit},product){
            commit('addToWishList',product)
        },
        async removeFromWishList({commit},product){
            commit('removeFromWishList',product)
        },
        
    },

}