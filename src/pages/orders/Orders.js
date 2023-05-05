import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Button, Card} from "react-bootstrap";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const Orders = () => {
    const [orders , setOrders] = useState([]);
    const [orderexistance,setOrderexistance] = useState(false);
    const [loading,setLoading] = useState(false);

    const token = JSON.parse(localStorage.getItem("token"));

    const getAllOrders = async () => {
        try {
            const {data} = await axios.get("http://kzico.runflare.run/order/",{
                headers:{
                    authorization:
                    `Bearer ${token}`
                },
            })
            setOrderexistance(true);
            setOrders(data); 
            setLoading(true);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text:  `${error.response.data.message}`.toUpperCase(),
              })
            setLoading(false);
        }
    }
    useEffect(() => {
        getAllOrders();
    },[])
  return (
    <div>
    {
        loading ? (
            <>
            {
        orderexistance 
        ?
        (
                orders.map((item => {
                return <Card className="text-center w-75 mx-auto mt-5 mb-2" key={item._id}>
                        <Card.Header className='bg-secondary fw-semibold text-light'>Orders</Card.Header>
                        <Card.Body>
                            <Card.Text className='fw-bold fs-5'>
                            {
                                item.orderItems.map((item,index) => <p key={index}>{item.product.name}-{item.product.color}-${item.product.price}-{item.qty}</p>)
                            }
                                {item.shippingAddress.address}-{item.shippingAddress.phone}
                            </Card.Text>
                            <Button as={Link} to={`/orders/${item._id}`} variant="warning">Details</Button>
                        </Card.Body>
                        <Card.Footer className='bg-secondary fw-semibold text-light'>Shipping Price:${item.shippingPrice} - Total Price:${item.totalPrice}</Card.Footer>
                        </Card>
            }))
        ) 
        :
        (
            <p>No orders!</p>
        )
    }
            </>
        )
        :
        (
            <div>
            <div class="lds-dual-ring" style={{width:"100%",height:"70vh",display:"flex",justifyContent:"center",alignItems:"center"}}></div>
        </div>
        )
    }
    
       
    </div>
  )
}

export default Orders