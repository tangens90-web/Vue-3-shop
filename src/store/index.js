import { createStore } from "vuex";
import user from './modules/user'
import products from './modules/products'



const store = createStore({
    // namespaced:true,
    modules:{
        user,
        products,
    
    },
})
export default store