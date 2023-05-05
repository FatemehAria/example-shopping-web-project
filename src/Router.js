import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Productcards from "./components/productcards/Productcards";
import Notfound from "./pages/notfound/Notfound";
import Singleproduct from "./pages/singleproduct/Singleproduct";
import Address from "./pages/address/Address";
import Checkout from "./pages/checkout/Checkout";
import Signup from "./pages/signup/Signup";
import Profile from "./pages/profile/Profile";
import Setting from "./pages/setting/Setting";
import Orders from "./pages/orders/Orders";
import Singleorder from "./pages/singleorder/Singleorder";
import Changeprofile from "./pages/changeprofile/Changeprofile";
import Changepassword from "./pages/changepassword/Changepassword";
import Uploadavatar from "./pages/uploadavatar/Uploadavatar";
import Contactus from "./pages/contactus/Contactus";
import Aboutus from "./pages/aboutus/Aboutus";

const Router = () => {
  const token =  JSON.parse(localStorage.getItem("token"))
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productcards" element={<Productcards />} />
        <Route eaxct path="/productcards/:_id" element={<Singleproduct />} />
        <Route path="/cart" element={<Cart />} />
         <Route path="/login" element={<Login />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/address" element={<Address />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/setting/changeprofile" element={<Changeprofile />} />
        <Route path="/setting/changepassword" element={<Changepassword />} />
        <Route path="/setting/uploadavatar" element={<Uploadavatar />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:_id" element={<Singleorder />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/aboutus" element={<Aboutus />} />
      </Routes>
    </div>
  );
};

export default Router;
