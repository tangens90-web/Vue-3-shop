import {createRouter, createWebHistory} from 'vue-router'

const Main = () => import('@/components/Main.vue')
const CartItem = ()=> import ('@/components/CartItem.vue')


const routes = [
    {
        path:'/',
        name:'new',
        component:Main
    },
    {
        path:'/:category',
        name:'shop',
        component:Main

    },
    
        {
            path: '/cartItem',
            name: 'cartitem',
            component: CartItem,
        },
    
    
]
const router = createRouter({
    history:createWebHistory(),
    routes

})

export default router