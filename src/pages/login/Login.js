import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getProfile } from "../../action";
import styles from "./login.module.css";

const Login = () => {
  const { errmsg, offscreen, background, formStyle } = styles;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [successmsg, setSuccessmsg] = useState(false);
  const [userbackward, setBackward] = useState(true);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrormsg("");
  }, [username, password]);

  useEffect(() => {
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
  }, [userbackward]);

  // -------------------------------------
  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", JSON.stringify(data.user.token));
      localStorage.setItem("email", JSON.stringify(data.user.email));
      setSuccessmsg(true);
      setBackward(false);
      // console.log(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.response.data.message}`.toUpperCase(),
      });
      setBackward(true);
    }
  };
  // -----------------------------------------
  return (
    <>
      {successmsg ? (
        (Swal.fire({
          position: "top-center",
          icon: "success",
          title: "You Are In!",
          showConfirmButton: false,
          timer: 1500,
        }),
        navigate("/"))
      ) : (
        <div className={formStyle}>
          <p className={background}></p>
          <p
            ref={errorRef}
            className={errormsg ? `${errmsg}` : `${offscreen}`}
            aria-live="assertive"
          >
            {errormsg}
          </p>
          <Form className="me-5 my-auto w-50" onSubmit={userLogin}>
            <Form.Group className="mb-3">
              <h2 className="mb-5">Login</h2>
              <Form.Label>Username Or Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username or email"
                value={email}
                ref={userRef}
                autoComplete="off"
                onChange={(e) => {
                  setUsername(e.target.value);
                  setEmail(e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="ms-2 text-light" type="submit" variant="warning">
              Login
            </Button>

            <Button
              as={Link}
              to="/signup"
              className="ms-2 text-light"
              variant="warning"
            >
              Signup
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default Login;
