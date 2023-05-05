import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./header.module.css";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { faHouse , faCartPlus , faEllipsis} from '@fortawesome/free-solid-svg-icons';
import {  getProfile } from '../../action';

const Header = () => {
  const {iconsAlignment , icons , dropdownItems , dropDownIcon} = styles;
  const state = useSelector(state => state.cartItem);
  const [userbackward, setBackward] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
const dispatch = useDispatch()
  const logout = () => {
    localStorage.clear();
    navigate("/");
  }
  const preventBackward = () => {
    // setTimeout(()=>{
    //   window.history.forward()
    // },0)
    // window.onunload = () => {
    //   return null
    // }
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/" className='fw-bold fs-4'>Shopping Website</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">

          <div className={iconsAlignment}>
          <Nav.Link as={Link} to="/">
          <FontAwesomeIcon icon={faHouse} className={icons}></FontAwesomeIcon>
          </Nav.Link>

          <Nav.Link as={Link} to="/cart">
          <FontAwesomeIcon icon={faCartPlus} className={icons} style={{marginTop:'0.25rem'}}></FontAwesomeIcon> 
          <span style={{position:"relative",fontSize:"calc(0.40em + 0.40vw)",fontWeight:"bold"}} >(
            {
              state.reduce((acc,item) => acc + item.qty,0)
            }
            )</span>
          </Nav.Link>
{/* ------------------------------------------------------------------------------------------------------------------------ */}
          <NavDropdown as={Link} to={window.location.href} title={(token)  ? JSON.parse(localStorage.getItem("email")) : <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon>} className={dropDownIcon}  style={{fontSize:"calc(0.46em + 0.46vw)"}} id="basic-nav-dropdown">
          {
            token ? 
            (
              <>
                <NavDropdown.Item as={Link} to="/profile" className={dropdownItems}>Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orders" className={dropdownItems}>Orders</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/setting" className={dropdownItems}>Setting</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className={dropdownItems} onClick={() => (logout() , console.log("You are logged out!") )} >Log out</NavDropdown.Item>
              </>
            )
            :
            (
              <>
                <NavDropdown.Item as={Link} to="/login" className={dropdownItems}>Login</NavDropdown.Item>
                {
                  preventBackward()
                }
              </>
            )
          }

          </NavDropdown>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header;