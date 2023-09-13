export interface Product extends ImageUrls{
    
        id: number,
        title: string,
        category?: string,
        price?: number,
        img: ImageUrls["url"],
        desc?: string,
        availableItem?:number,
        inCart?:number
        quantity?:number
      
}

export interface ImageUrls{
    url:string[]
  }