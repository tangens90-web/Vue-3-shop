<template>
    <div class="container-fluid">
        <div class="row justify-content-md-center">
            <div class="col-3"><aside-block></aside-block></div>
            <div class="col">
                <div class="row">
                    <Card></Card>
                    
                      
            </div>
        </div>
            </div>
        </div>
           
    

</template>

<script>
import {useStore } from 'vuex'
import {ref,toRefs,computed,onMounted} from 'vue'
import AsideBlock from '@/components/AsideBlock.vue'
import Card from '@/components/Card.vue'

export default {
   
    setup () {
       
  

        const store = useStore()

        store.dispatch('getProducts')
        
        
        
        
        onMounted(() => {
            // console.log(store.getters.cart)
            store.dispatch('loadWishList')
            store.dispatch('loadCart')
            })
       
        const removeFromCartItem = (product)=>{
            store.dispatch('removeFromCart',product)
        }
        
       
        return {
            
            removeFromCartItem

        }
    },
    components: {
        AsideBlock,
        Card
    }
}

</script>

<style lang="scss" scoped>


  
</style>
