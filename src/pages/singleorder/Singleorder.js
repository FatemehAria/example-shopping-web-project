import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const Singleorder = () => {
  const [singleorder , setSingleOrder] = useState({});
  const {_id} = useParams();
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading,setLoading] = useState(false);

  const GetOneOrder = async () => {
    try {
      const {data} = await axios.get(`http://kzico.runflare.run/order/${_id}`,{
        headers:{
            authorization:
            `Bearer ${token}`
        },
      }
      )
      setSingleOrder(data);
      setLoading(true)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text:  `${error.response.data.message}`.toUpperCase(),
      })
      setLoading(false);
    }
  }
  useEffect(() => {
    GetOneOrder();
  },[])
  return (
    <div>
    {
      loading ? (
        <div>
        <Card className="text-center w-75 mx-auto mt-5">
        <Card.Header className='bg-secondary fw-semibold text-light'>My Orders</Card.Header>
      <Card.Body>
        <Card.Text className='fw-bold fs-5'>
        {Object.values(singleorder).map(item => (Object.values(item).map(i => (Object.values(i).map((v,index) => <p key={index}>{v.name} {v.color}{v.description}{v.category}{v.price} {v.brand}</p>)))))}

        {Object.keys(singleorder).map((item,index) => (<p key={index}>{singleorder[item].address} {singleorder[item].city} {singleorder[item].phone} {singleorder[item].postalcode}</p>))}
        </Card.Text>
      </Card.Body>
      <Card.Footer className='bg-secondary fw-semibold text-light'>          {singleorder.paymentMethod}  ${singleorder.totalPrice} </Card.Footer>
    </Card>
        </div>
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

export default Singleorder