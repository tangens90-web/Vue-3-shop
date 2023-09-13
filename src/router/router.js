import {createRouter, createWebHistory} from 'vue-router'

const Main = () => import('@/components/Main.vue')
const CartItem = ()=> import ('@/components/CartItem.vue')
const Product = () => import('@/components/Product.vue')
const Registration = ()=> import('@/components/Registration.vue')

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
        {
            path:'/product/:id',
            name:'oneProduct',
            component:Product
        },
        {
            path:'/registration',
            name:'registration',
            component:Registration
        }

    
    
]
const router = createRouter({
    history:createWebHistory(),
    routes

})

export default router