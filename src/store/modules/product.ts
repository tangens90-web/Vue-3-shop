import Products from "../../axios/products"
import { Product } from "../../types/product"; 
import {Categories} from "../../types/categories"
function updateLocalStorage(cart) {
    
    localStorage.setItem('cart', JSON.stringify(cart))
  }
  function updateLocalStorageWish(wishList) {
    
    localStorage.setItem('wishList', JSON.stringify(wishList))
  }

import { defineStore } from "pinia";

type State={
    products :Product[],
    category: Categories[],
    cart: Product[],
    wishList:Product[],
    maxQuantity:number,
    price:number,
}

export const useProducts = defineStore('tests',{
    state: ():State =>(
        {  products : [],
            category: [],
            cart: [],
            wishList:[],
            maxQuantity:3,
            price:0,
        }),
       getters:{
        calcPrice: state=> state.price
       },
        actions: {
            async getProducts(){
                let data = await Products.getProducts()
                this.products = data
                console.log(this.products)
                 this.reduceCategories()
                // commit('getproduct',data)
            },
            //cartItem
                async loadCart(){
                
                
                let cart = localStorage.getItem('cart') || []
                if (cart.length>0) {
                  cart = JSON.parse(cart)
                }
                this.cart = cart 
                
            },
            async addToCart(product:Product){
                let item = this.cart.find(i=>i.id==product.id)
                if(item){
                    item.quantity++
                }
                else{
                   this.cart.push({...product,quantity:1})
                }
                updateLocalStorage(this.cart)
                this.calculatePrice()
            },
            async calculatePrice(){
                this.price = this.cart.reduce((value,item)=>{
                    value += item.quantity*item.price
                    return value },0)
            },
            async removeFromCart(product){
                let index = this.cart.findIndex(i=>i.id == product.id)
                if(index !==-1){
                    this.cart.splice(index,1)
                }
                updateLocalStorage(this.cart)
            },
            async increaseProduct(product){
                let item = this.cart.find(i=>i.id==product.id)
                if(item){
                    if(item.quantity< this.maxQuantity){
                    item.quantity++
                }
                }
                
                updateLocalStorage(this.cart)
            },
            async decreaseProduct(product){
                let item = this.cart.find(i=>i.id==product.id)
                
                
                if(item){
                    if(item.quantity>1){
                      item.quantity--  
                    }
                }
                
                updateLocalStorage(this.cart)
            },
            async cleanCartItem(){
                this.cart = []
                updateLocalStorage(this.cart)
            },
            async reduceCategories(){
                console.log('qRQRwr');
                this.category = this.products.reduce((categories,item)=>{
                    if(!categories.includes(item.category)){
                        categories.push(item.category)
                    }
                    return categories
                },[])
                console.log(this.products);
                
            },
           
            
            // WishList
            async loadWishList(){
                
                
                let wishList = localStorage.getItem('wishList') || []
                if (wishList.length) {
                    wishList = JSON.parse(wishList)
                }
                this.wishList = wishList
                
            },
            async addToWishList(product){
                let item = this.wishList.find(i=>i.id==product.id)
                if(item){
                    item.quantity++
                }
                else{
                    this.wishList.push({...product,quantity:1})
                }
                updateLocalStorageWish(this.wishList)
            },
            async removeFromWishList(product){
                let index = this.wishList.findIndex(i=>i.id == product.id)
                if(index !==-1){
                    this.wishList.splice(index,1)
                }
                updateLocalStorageWish(this.wishList)
            },
            
        },
}) 