export const products = (state={productData:[] , productLoading:false , productError:"" , pagination:[]}, {type , payload}) => {
    switch (type) {
        case "productLoading":
           return payload;
        case "productSuccess":
           return payload;
        case "productError":
           return payload;
        default:
            return state;
    }
}
export const profile = (state = {userData:{}} , {type , payload}) => {
   switch(type){
      case "loggedin":
         return payload;
      default:
         return state;
   }
}


const cartInLocal = JSON.parse(localStorage.getItem("carts") || "[]")
export const cartItem = (state = cartInLocal , {type , payload}) => {
   const product = payload;
   switch(type){
      case "addItem":
         if(state.find((x) => x._id === product._id)){
            return state.map((x) => x._id === product._id ? ({...x , qty: x.qty + (x.qty < x.countInStock ? 1 : 0)  }) : x)
         }else{
            const product = payload;
            return [...state , {...product , qty:1 }]
         }
         break;
      case "delItem":
         const exist = state.find((x) => x._id === product._id);
          if(exist.qty === 1){
             return state.filter((x) => x._id !== exist._id)
            }else{
               return state.map((x) => x._id === product._id ? {...x, qty: x.qty-1 } : x)
            }
            break;
            default:
               return state;
}   
}

export const address = (state = {city : "" , address : "" , postalcode : "" , phonenumber : ""} , {type , payload}) => {
   switch(type){
      case "addresssubmited":
         return {...state , ...payload};
      default:
         return state;
   }
}
export const loginInfo = (state = {password:""} , {type,payload}) => {
   switch(type){
      case "passLogin":
         return {...state , ...payload};
      default:
         return state;
   }
}