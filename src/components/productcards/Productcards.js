import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useMemo, useState } from 'react'
import { Card, Col, Container, Pagination, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getProducts } from '../../action';
import { faStar , faBox} from '@fortawesome/free-solid-svg-icons';

const Productcards = () => {
    const dispatch = useDispatch();
    const {productData , productLoading , productError, pagination} = useSelector(state => state.products);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getProducts());
    },[])

    return (
    <div>
    {
        productLoading 
        ?
        <div>
            <div class="lds-dual-ring" style={{width:"100%",height:"70vh",display:"flex",justifyContent:"center",alignItems:"center"}}></div>
        </div>
         
        : productError ?
         <div>
            <p style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",margin:"5px auto",fontSize:"20px",backgroundColor:"silver",fontWeight:"bold",borderRadius:"2px"}}>{productError}</p>
        </div> :  
        <Container className='mt-4'>
        <Row>
        {
            productData.slice((page - 1) * 3, (page ) * 3).map((item) => (
            <Col xs="4" key={item._id} className='mb-4'>
                <Card className=" h-100 text-decoration-none text-dark flex-xs-wrap" as={Link} to={`/productcards/${item._id}`}>
                    <Card.Body>
                        <Card.Img src={item.image} className="w-75 h-50 mt-1" />
                        <Card.Title className="h-25 p-4 text-left" style={{fontSize:"calc(0.10em + 0.60vw)"}}>{item.name}</Card.Title>
                        <Card.Text>
                         <p className='w-100 text-center mt-4'>
                            <FontAwesomeIcon icon={faBox} className="fs-0.5 me-1" />
                            <span className="text-danger fw-semibold" style={{fontSize:"calc(0.40em + 0.40vw)"}}>{item.countInStock == 0 ? "Out Of Stock" : item.countInStock}</span>
                         </p> 
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted d-flex justify-content-around border-top-0 fw-bold" style={{backgroundColor:"#F8F8F8",fontSize:"0.65rem"}}>
                            <span className='text-success'>${item.price}</span>
                            <span className='text-dark'><FontAwesomeIcon icon={faStar} className="me-1 text-warning"/>{item.rating}</span>
                    </Card.Footer>
                </Card>
            </Col>
        ))}
        </Row>
        <div className='d-flex justify-content-center'>
            <Pagination size='sm'>
                <Pagination.First onClick={() => setPage(1)}/>
                <Pagination.Prev 
                onClick={() => {
                    if(page > 1) {
                        setPage(last => last - 1)
                    }
                    }} />
                {
                    pagination.map(item => (
                    <Pagination.Item key={item} onClick={() => setPage(item)} active={item === page ? true : false}>{item}</Pagination.Item>

                    ))
                }
                <Pagination.Next onClick={ ()=> {
                    if(page < pagination.length){
                        setPage(last => last + 1);
                    }
                    }}
                    />
                <Pagination.Last onClick={() => setPage(pagination.length)}/>
            </Pagination>
        </div>
    </Container>
    }
        </div>
        )
    }
export default Productcards;