<template>
    <Head></Head>
    <div class="container-sm ">
        <p class="">{{price}}</p>
        <div class="row justify-content-md-center">
            
            <div class="col">
                <div class="row">
                    <div class="cards d-flex wrap mr-5 mb-3" v-for="product in products" :key="product.id">
                 
                 <div class="card" style="width: 18rem;">
                    
                <img :src="getImageUrl(product.img)" class="img-fluid img-height" alt="...">
                <div class="card-body"> 
                <h5 class="card-title">{{product.title}}</h5>
                <p class="card-text">{{product.desc}}</p>
                <p class="card-text">Price: {{product.price}} $</p>
                <p class="card-text">Quantity: {{product.quantity}} </p>
                <div class="class d-flex justify-content-center">
                    <button
                 class="btn btn-primary" :disabled="(product.quantity>=3)"  @click="increaseProduct(product)">+</button>
                 <button
                 class="btn btn-primary" :disabled="(product.quantity<=1)"  @click="decreaseProduct(product)">-</button>
                 
                <button
                 class="btn btn-danger"  @click="removeFromCart(product)">Remove from Cart</button>
                

                
            </div>

  </div>
  </div>
    </div>
                    
                      
            </div>
        </div>
            </div>
        </div>
    
</template>

<script>
import {  computed,onMounted, watch } from 'vue'
import Head from "./Head.vue"
import { useStore } from 'vuex'
export default {
    components: {
        Head,
    },
    setup () {
        
       
        const store = useStore()
        const getImageUrl = (name) => {
                return new URL(`../${name}`, import.meta.url).href }
        store.dispatch('loadCart')
        const increaseProduct=(product)=>{
            store.dispatch('increaseProduct',product)
        }
        const decreaseProduct=(product)=>{
            store.dispatch('decreaseProduct',product)
        }
        const removeFromCart =(product)=>{
            store.dispatch('removeFromCart',product)
        }
        const products = computed(()=>{

            return store.getters.cart}
)
            const price = computed(()=>{
                return store.getters.price
            })

            onMounted(() => {
                store.commit('calcPrice')
    })
    watch(products,()=>{
        store.commit('calcPrice')
    },
    {deep:true})
        return {
            getImageUrl,
            increaseProduct,
            decreaseProduct,
            removeFromCart,
            price,
            products,
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>