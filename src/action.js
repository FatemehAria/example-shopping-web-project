import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const getProfile = () => async (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        // console.log("token in try" + token)
        const {data} = await axios.get("http://kzico.runflare.run/user/profile",
            {
                headers:{
                    authorization:
                    `Bearer ${token}`
                },
            });
            dispatch({type:"loggedin",payload:{userData:{...data}}})
            console.log(data);
            // console.log(token)
    } catch (error) {
        Swal.fire({
            icon: 'error',
            text:  "You Are Logged Out!"
        });
        console.log(error.response.data)
    }
}
export const getProducts = (_id) => async (dispatch) => {
    try {
        dispatch({type:"productLoading" , payload:{productData:[],productLoading:true,productError:"",pagination:[]}});
        const {data} = await axios.get("http://kzico.runflare.run/product/ ");
        const help = [];
        for(let i = 0; i < data.length / 3 ; i++){
            help.push(i + 1);
        }
        dispatch({type:"productSuccess" , payload:{productData:[...data],productLoading:false,productError:"", pagination:[...help]}});
        const dataArr = data.map(item => ({...item,qty:0}));
        // console.log(dataArr);
        } catch (error) {
            dispatch({type:"productError" , payload:{productData:[],productLoading:false,productError: Swal.fire({
                icon: 'error',
                text:  `${error.response.data.message}`.toUpperCase(),
              })}});
        }
    }

export const addCart = (product) => {
    return{
        type: "addItem",
        payload: product
    }
}
export const delCart = (product) => {
    return{
        type: "delItem",
        payload: product
    }
}

export const addressSubmission = (payload) => {
    return {
        type:"addresssubmited",
        payload
    }
}