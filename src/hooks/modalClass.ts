import { ref } from 'vue';

export default class ModalClass {
  modalIsOpened = ref<boolean>(false);
  timer: number | null = null;
  
  //1 function 
        closeModal():void {
    this.timer = setTimeout(()=>{
       this.modalIsOpened.value = false
      
    },1000)
  }
  
   //3 function 
        openModal = ():void=>{
                  
                  clearTimeout(this.timer)
                  this.modalIsOpened.value=true
                 
                }
                //4 function
                 keepModalOpened=(bool:boolean):void=>{
                  if(bool) clearTimeout(this.timer)
                  
                  else this.closeModal()
                }
       
   
   
  
}
