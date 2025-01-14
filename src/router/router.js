import {createRouter, createWebHistory,createMemoryHistory} from 'vue-router'
import {ROUTES_PATH} from '@/core/constants/routes'
const Main = () => import('@/views/Main.vue')
const CartItem = ()=> import ('@/views/CartItem.vue')
const ProductShow = () => import('@/views/ProductShow.vue')
const Registration = ()=> import('@/views/Registration.vue')
const baseUrl = import.meta.env.BASE_URL
const history = import.meta.env.SSR ? createMemoryHistory(baseUrl) : createWebHistory(baseUrl)
const routes = [
    {
        path:ROUTES_PATH.HOME,
        name:ROUTES_PATH.HOME,
        component:Main
    },
    {
        path:ROUTES_PATH.CATEGORY,
        name:ROUTES_PATH.CATEGORY,
        component:Main

    },
    
        {
            path: ROUTES_PATH.CARTITEM,
            name: ROUTES_PATH.CARTITEM,
            component: CartItem,
        },
        {
            path:ROUTES_PATH.PRODUCT,
            name:ROUTES_PATH.PRODUCT,
            component:ProductShow
        },
        {
            path:ROUTES_PATH.REGISTRATION,
            name:ROUTES_PATH.REGISTRATION,
            component:Registration
        }

    
    
]
const router = createRouter({
    history,
    routes

})

export default router