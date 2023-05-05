import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Card} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { addCart } from "../../action";

const Singleproduct = () => {
    const { _id } = useParams();
    const [singleproduct, setSingleproduct] = useState([]);
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();
    const addProduct = (product) => {
      dispatch(addCart(product))
    }
    
  useEffect(() => {
    const getSingleproduct = async () => {
      const response = await fetch(`http://kzico.runflare.run/product/${_id}`);
      setSingleproduct(await response.json());
      setLoading(true)
    };
    getSingleproduct();
  }, []);

  const notify = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Product Added!',
      showConfirmButton: false,
      timer: 1500,
      width: '30rem'
    })
    
  }

  return (
    <div>
    {
      loading ? (
        <>
        <Card className="mt-5 w-50 mx-auto">
        <div>
          <Card.Img src={singleproduct.image}  className='mt-2 mb-0 w-25 h-50' />
        </div>
        <Card.Text style={{margin:"1rem 0 0 0",fontWeight:"bold",fontSize:"calc(0.50em + 0.60vw)"}}>
            <p>Product Category: {singleproduct.category}</p>
            <p>Product Brand: {singleproduct.brand}</p>
            <p><FontAwesomeIcon icon={faStar} className='text-warning me-1'></FontAwesomeIcon>{singleproduct.rating}</p>
            <p className="text-success">${singleproduct.price}</p>
        </Card.Text>
      </Card>
        <Card.Footer className="mt-0">
          <Button as={Link} to={singleproduct.countInStock === 0 ? "" : "/cart"} variant={singleproduct.countInStock === 0 ? "danger" : "warning"} disabled={singleproduct.countInStock === 0 ? true : false} className="mt-2 fw-semibold mb-2" onClick={() => {return (singleproduct.countInStock != 0 && (addProduct(singleproduct), notify()))}}>Add to cart</Button>
        </Card.Footer>
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
  );
};

export default Singleproduct;