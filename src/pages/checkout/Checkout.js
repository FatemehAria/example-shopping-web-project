import axios from 'axios';
import React, {useMemo, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import {useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const Checkout = () => {
  const state = useSelector(state => state.cartItem );
  const [submitSuccess,setSubmitsuccess] = useState(false);
  const navigate = useNavigate();

  const [method,setMethod] = useState("");
  console.log(method);

  const {city , address , postalcode , phonenumber} = useSelector(state => state.address);


  let sum = 0;
  const calcTotal = (item) => {
    sum = sum + item.price;
  }
  const [id,setId] = useState("");
  const [quantity,setQuantity] = useState(0);

  useMemo(() => {
    state.map(item => {
      setId(item._id);
      setQuantity(item.qty);
    })
  },[id,quantity])
    
  

  const token = JSON.parse(localStorage.getItem("token"));
  const submit = async () => {
    try{
      const {data} = await axios.post(
          "http://kzico.runflare.run/order/submit",
          {
            orderItems: [
              { product: `${id}`, qty: 2},
              { product: `${id}`, qty: 2 },
            ],
            shippingAddress: {
              address: `${address}`,
              city: `${city}`,
              postalCode: `${postalcode}`,
              phone: `${phonenumber}`,
            },
            paymentMethod: `${method}`,
            shippingPrice: "5",
            totalPrice: sum,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );
        console.log(data)
        setSubmitsuccess(true);
        state.length = 0;
      }catch(error){
        Swal.fire({
          icon: 'error',
          text:  `${error.response.data.message}`.toUpperCase(),
        })
        }
  }
  
  return (
    <div>
    {
      submitSuccess ? 
      (
        Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Product Submission Done!',
              showConfirmButton: false,
              timer: 1500
            }),
            navigate("/"),
            localStorage.removeItem("carts")
      )
      :
      (
        <div>
        <Card  className="text-center w-75 mx-auto mt-5">
        <Card.Header className='bg-secondary fw-semibold text-light'>Checkout</Card.Header>
          <Card.Body>
            <Card.Text className='fw-bold fs-5'>
              {state.map((item) => (
                <div>
                  <h3>{item.name} - {item.brand} - ${item.price}</h3>
                </div>
              ))}
            </Card.Text>
            <Card.Text className='fw-bold fs-5'>
                <p>{city}-{address}-{postalcode}-{phonenumber}</p>
            </Card.Text>
          </Card.Body>
          <Card.Footer className='bg-secondary fw-semibold text-light'>
            <p>Number Of Carts:{state.length}</p>
              {state.map(calcTotal)}
            <p>Total Price Is: ${sum}</p>
          <Button className='ms-2 text-light' type="submit" variant='warning' as={Link} to="/cart">Edit Cart</Button>
          </Card.Footer>
        </Card>
        <Form className='w-75 mx-auto'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Your Cashing Method:</Form.Label>
        <Form.Control type="text" placeholder="Cashing Method" onChange={(e) => setMethod(e.target.value)}/>
        <Form.Text className="text-muted">
        Ship Or Cash.
        </Form.Text>
      </Form.Group>
    </Form>
        <div className='mt-2'>
            <Button as={Link} to="/address" className='me-2 text-light' variant='warning'>Edit</Button>
            <Button className='me-2 text-light' type='submit' variant='success' onClick={submit}>Done</Button>
        </div>
        </div>
      )
    }
       
    </div>
  )
}

export default Checkout