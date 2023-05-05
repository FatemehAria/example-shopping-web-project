import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./signup.module.css";

const pass_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const user_reg = /^[A-z][A-z0-9-_]{5,22}$/;
const email_reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i;
const mobile_reg = /^(09)\d{9}$/;

const Signup = () => {
  const {
    errmsg,
    offscreen,
    hide,
    instructions,
    valid,
    invalid,
    background,
    formStyle,
  } = styles;
  const navigate = useNavigate();
  // putting focus
  const userRef = useRef();
  const errorRef = useRef();
  const [userbackward, setBackward] = useState(true);

  const [username, setUsername] = useState("");
  const [validUsername, setValidusername] = useState(false);
  const [userfocus, setUserfocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validpassword, setValidpassword] = useState(false);
  const [passfocus, setPassfocus] = useState(false);

  const [matchpass, setMatchpass] = useState("");
  const [validmatch, setValidmatch] = useState(false);
  const [matchfocus, setMatchfocus] = useState(false);
  // emailinput,checking the email validation, having focus on inp field
  const [email, setEmail] = useState("");
  const [validemail, setValidemail] = useState(false);
  const [emailfocus, setEmailfocus] = useState(false);
  // mobile input,checking the email validation, having focus on inp field
  const [mobile, setMobile] = useState("");
  const [validmobile, setValidmobile] = useState();
  const [mobilefocus, setMobilefocus] = useState();
  // checking if we have successfully signedup or not
  const [errormsg, setErrormsg] = useState("");
  const [successmsg, setSuccessmsg] = useState(false);
  // Automtically focus on first inp which is username inp
  useEffect(() => {
    userRef.current.focus();
  }, []);
  // ****************************************************************
  useEffect(() => {
    const result = user_reg.test(username);
    setValidusername(result);
  }, [username]);

  useEffect(() => {
    const result = pass_reg.test(password);
    console.log(password);
    setValidpassword(result);
    setValidmatch(password === matchpass);
  }, [password, matchpass]);
  // Checking mobile validation with regex
  useEffect(() => {
    const result = mobile_reg.test(mobile);
    console.log(mobile);
    setValidmobile(result);
  }, [mobile]);
  // Checking email validation with regex
  useEffect(() => {
    const result = email_reg.test(email);
    console.log(email);
    setValidemail(result);
  }, [email]);
  // The error's been read by the user so claer it
  useEffect(() => {
    setErrormsg("");
  }, [username, password, matchpass, email, mobile]);

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
  // ---------------------------------------------------------
  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://kzico.runflare.run/user/signup",
        {
          username: `${username}`,
          email: `${email}`,
          password: `${password}`,
          mobile: `${mobile}`,
        }
      );
      console.log(data);
      setSuccessmsg(true);
      setUsername("");
      setPassword("");
      setEmail("");
      setMatchpass("");
      setMobile("");
      setBackward(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.response.data.message}`.toUpperCase(),
      });
      setBackward(true);
    }
  };
  return (
    <div>
      {successmsg ? (
        (Swal.fire("Sign up Completed!Please Sign in again!"),
        navigate("/login"))
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

          <Form className="w-50 my-auto ms-5" onSubmit={submit}>
            <h2 className="mb-5">Signup</h2>
            {/* USERNAME */}
            <Form.Group className="mb-3">
              <Form.Label>
                Username
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validUsername ? `${valid}` : `${hide}`}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validUsername || !username ? `${hide}` : `${invalid}`
                  }
                ></FontAwesomeIcon>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-invalid={validUsername ? "false" : "true"}
                aria-describedby="usernote"
                onFocus={() => setUserfocus(true)}
                onBlur={() => setUserfocus(false)}
              />
              <p
                id="usernote"
                className={
                  userfocus && username && !validUsername
                    ? `${instructions}`
                    : `${offscreen}`
                }
              >
                <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                Atleast 5 to 24 chars,beginning with a
                letter.Letters,numbers,underscores and hyphens are alllowed.
              </p>
            </Form.Group>
            {/* EMAIL */}
            <Form.Group className="mb-3">
              <Form.Label>
                Email
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validemail ? `${valid}` : `${hide}`}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validemail || !email ? `${hide}` : `${invalid}`}
                ></FontAwesomeIcon>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validemail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailfocus(true)}
                onBlur={() => setEmailfocus(false)}
              />
              <p
                id="emailnote"
                className={
                  emailfocus && email && !validemail
                    ? `${instructions}`
                    : `${offscreen}`
                }
              >
                <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                Must not begin with dots or hyphens.
              </p>
            </Form.Group>
            {/* PASSWORD */}
            <Form.Group className="mb-3">
              <Form.Label>
                Password
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validpassword ? `${valid}` : `${hide}`}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validpassword || !password ? `${hide}` : `${invalid}`
                  }
                ></FontAwesomeIcon>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validpassword ? "false" : "true"}
                aria-describedby="passwordnote"
                onFocus={() => setPassfocus(true)}
                onBlur={() => setPassfocus(false)}
              />
              <p
                id="passwordnote"
                className={
                  passfocus && !validpassword
                    ? `${instructions}`
                    : `${offscreen}`
                }
              >
                <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                Must be 8 to 24 characters,including both upper and lowercase
                letters, a number and a special character.Only "!" is allowed as
                a special character.
              </p>
            </Form.Group>
            {/* PASSWORD CONFIRMATION */}
            <Form.Group className="mb-3">
              <Form.Label>
                Confirm Password
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validmatch && matchpass ? `${valid}` : `${hide}`}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validmatch || !matchpass ? `${hide}` : `${invalid}`
                  }
                ></FontAwesomeIcon>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Password Again"
                onChange={(e) => setMatchpass(e.target.value)}
                onFocus={() => setMatchfocus(true)}
                onBlur={() => setMatchfocus(false)}
                required
                aria-invalid={validmatch ? "false" : "true"}
                aria-describedby="confirmnote"
              />
              <p
                id="confirmnote"
                className={
                  matchfocus && !validmatch ? `${instructions}` : `${offscreen}`
                }
              >
                <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                Must match the password you chose.
              </p>
            </Form.Group>
            {/* MOBILE */}
            <Form.Group className="mb-3">
              <Form.Label>
                Mobile
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validmobile ? `${valid}` : `${hide}`}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validmobile || !mobile ? `${hide}` : `${invalid}`}
                ></FontAwesomeIcon>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Mobile"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                required
                aria-invalid={validmobile ? "false" : "true"}
                aria-describedby="mobilenote"
                onFocus={() => setMobilefocus(true)}
                onBlur={() => setMobilefocus(false)}
                maxLength="11"
              />
              <p
                id="mobilenote"
                className={
                  mobilefocus && !validmobile
                    ? `${instructions}`
                    : `${offscreen}`
                }
              >
                <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                {`Must Begin With (09) And Be Exactly 11 Digits.`}
              </p>
            </Form.Group>

            <Button
              variant="warning"
              disabled={
                !validUsername ||
                !validmatch ||
                !validpassword ||
                !validemail ||
                !validmobile
                  ? true
                  : false
              }
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};
export default Signup;
