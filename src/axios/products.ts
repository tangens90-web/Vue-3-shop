import axios from 'axios'
import { Product } from '../types/product'
let url = "../src/assets/products.json"
let api = "https://dummyjson.com/products"


// let products:string[] 

// interface Productss {
//     imageUrl:products[]
// }

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











