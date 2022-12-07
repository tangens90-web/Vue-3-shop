<template>
    <Head></Head>
<div class="container-fluid mt-3">
    
    <Products></Products>
    
     

</div>
</template>

<script>


import Head from './Head.vue'
import Products from './Products.vue'
import {ref,toRefs,computed,onMounted} from 'vue'


export default {
    components: {
        Products,
        Head,
        
    },
    setup() {
        

        
        
        
       
        return {
            
            
            
            
        }
        
    }
}




</script>

<style lang="scss">
$red: red;

.great {
    color: $red
}


</style>
