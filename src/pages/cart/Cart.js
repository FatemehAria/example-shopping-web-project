import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState} from 'react'
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { addCart, delCart } from '../../action';

const Cart = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.cartItem );
  const handleClose = (item) => {
    dispatch(delCart(item))
  }

  useEffect(()=>{
    localStorage.setItem("carts",JSON.stringify(state))
  },[state])

  const token = localStorage.getItem("token");
  const carts = (item) => {
    const handleIncrement = (cart_id) => {
        return (dispatch(addCart(item._id === cart_id ? ({...item , qty : item.qty + 1}) : item)))
        
    }
    const handleDecrement = (cart_id) => {
        return (dispatch(delCart(item._id === cart_id ? ({...item , qty : item.qty - 1}) : item)))
    }

    return(
      <Card className="text-center mb-2 w-75 mx-auto mt-5" key={item._id}>
      <Card.Body>
      <button className='btn-close float-end' aria-label='close' onClick={() => handleClose(item)}></button>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          <img src={item.image} style={{width:"11rem"}} alt={item.name}/>
          <span className='fw-bold'>
            <p className='text-center mt-2 fs-6'> Brand : {item.brand} </p>
            <p className='text-center fs-6'>Price : <span className='text-success'>${item.price}</span> </p>
          </span>
        </Card.Text>
        <span>
          <FontAwesomeIcon icon={faMinus} onClick={() => (handleDecrement(item._id))} className="me-2"></FontAwesomeIcon>
          <span>{item.qty}</span>
          <FontAwesomeIcon icon={faPlus} onClick={() => (handleIncrement(item._id))} className="ms-2"></FontAwesomeIcon>
        </span>
      </Card.Body>
    </Card>
)
}
  
  return ( 
    <div>

      {
      state.length !== 0 
      ?
      state.map(carts)
      :  
      (
        <Card className='w-75 mx-auto mt-5 fw-bold fs-3'>
          <Card.Body>Cart is Empty!</Card.Body>
        </Card>
      )
    }
    <p className='text-muted fw-semibold'>Total Price is: ${state.reduce((acc, item) => acc + item.qty * item.price, 0)}</p>
      <Button as={Link} to={token ? "/address" : "/login"} className='fw-semibold text-light mb-2' variant='warning' style={{display: state.length !== 0 ? "inline-block" : "none"}}>Next</Button>
      
    </div>
  )
}

export default Cart