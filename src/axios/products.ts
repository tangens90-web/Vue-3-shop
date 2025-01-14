import axios from 'axios'
import type { Product } from '../types/product'
let url = "../src/assets/products.json"





export default class Products{
    static getProducts():Promise<Product[]>{
         return new Promise ((resolve,reject )=>{
                  axios.get(`${url}`).then(
                     res=> {
                         const data = res.data
                         resolve(data.products)
                }).catch(error=>{
                    reject(error)
                })
            })
        
    }
}











