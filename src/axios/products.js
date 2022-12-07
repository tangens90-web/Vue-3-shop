import axios from 'axios'

let url = "../src/assets/products.json"
let api = "https://dummyjson.com/products"




export default class Products{
    static getProducts(){
         return new Promise ((resolve,reject )=>{
                  axios.get(`${url}`).then(
                     res=> {
                         const data = res.data
                         resolve(data)
                }).catch(error=>{
                    reject(error)
                })
            })
        
    }
}











