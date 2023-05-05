import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./changeprofile.module.css";

const name_reg = /^\w{4,11}$/;

const Changeprofile = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const { instructions, offscreen, valid, invalid, errmsg, hide } = styles;
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [validFirstname, setValidFirstname] = useState(false);
  const [lastname, setLastname] = useState("");
  const [validLastname, setValidLastname] = useState(false);
  const [city, setCity] = useState("");
  const [validCity, setValidcity] = useState(false);
  useEffect(() => {
    const result = name_reg.test(firstname);
    setValidFirstname(result);
  }, [firstname]);

  useEffect(() => {
    const result = name_reg.test(lastname);
    setValidLastname(result);
  }, [lastname]);

  useEffect(() => {
    const result = name_reg.test(city);
    setValidcity(result);
  }, [city]);

  const [gender, setGender] = useState("");
  const [validgender, setValidgender] = useState(false);

  const [proChangeSuccess, setProChangeSuccess] = useState(false);
  useEffect(() => {
    if (gender == "male" || gender == "female") {
      setValidgender(gender);
    }
  }, [gender]);

  const [age, setAge] = useState("");
  const [validage, setValidage] = useState(false);
  useEffect(() => {
    if (age >= 15) {
      setValidage(true);
    } else {
      setValidage(false);
    }
  }, [age]);

  const changePro = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://kzico.runflare.run/user/change-profile",
        {
          firstname: `${firstname}`,
          lastname: `${lastname}`,
          gender: `${gender}`,
          age: `${age}`,
          city: `${city}`,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setProChangeSuccess(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.response.data.message}`.toUpperCase(),
      });
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <Sidebar />
      {proChangeSuccess ? (
        (Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Profile Uploaded!",
          showConfirmButton: false,
          timer: 1500,
        }),
        navigate("/profile"))
      ) : (
        <Form className="w-50 mx-auto mt-5" onSubmit={changePro}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              First Name
              <FontAwesomeIcon
                icon={faCheck}
                className={validFirstname ? `${valid}` : `${hide}`}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validFirstname || !firstname ? `${hide}` : `${invalid}`
                }
              ></FontAwesomeIcon>
            </Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter Your First Name"
              onChange={(e) => setFirstname(e.target.value)}
              required
              aria-invalid={validFirstname ? "false" : "true"}
            />
            <p
              className={
                firstname && !validFirstname
                  ? `${instructions}`
                  : `${offscreen}`
              }
            >
              <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
              Must Be Up To 3 Characters.
            </p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Last Name
              <FontAwesomeIcon
                icon={faCheck}
                className={validLastname ? `${valid}` : `${hide}`}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validLastname || !lastname ? `${hide}` : `${invalid}`
                }
              ></FontAwesomeIcon>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Last Name"
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <p
              className={
                lastname && !validLastname ? `${instructions}` : `${offscreen}`
              }
            >
              <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
              Must Be Up To 3 Characters.
            </p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              City
              <FontAwesomeIcon
                icon={faCheck}
                className={validCity ? `${valid}` : `${hide}`}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faTimes}
                className={validCity || !city ? `${hide}` : `${invalid}`}
              ></FontAwesomeIcon>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your City"
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <p
              className={
                city && !validCity ? `${instructions}` : `${offscreen}`
              }
            >
              <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
              Must Be Up To 3 Characters.
            </p>
            {/* Age */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Age
              <FontAwesomeIcon
                icon={faCheck}
                className={validage ? `${valid}` : `${hide}`}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faTimes}
                className={validage || !age ? `${hide}` : `${invalid}`}
              ></FontAwesomeIcon>
            </Form.Label>
            <Form.Control
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter Your Age"
              aria-invalid={validage ? "false" : "true"}
              aria-describedby="agenote"
              required
            />
            <p
              id="agenote"
              className={age && !validage ? `${instructions}` : `${offscreen}`}
            >
              <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
              Age Must Be Over 15
            </p>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Gender
              <FontAwesomeIcon
                icon={faCheck}
                className={validgender ? `${valid}` : `${hide}`}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faTimes}
                className={validgender || !gender ? `${hide}` : `${invalid}`}
              ></FontAwesomeIcon>
            </Form.Label>
            <Form.Control
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Enter Your Gender"
              aria-invalid={validgender ? "false" : "true"}
              aria-describedby="gendernote"
              required
            />
            <p
              id="gendernote"
              className={
                gender && !validgender
                  ? `${instructions}`
                  : `${offscreen}`
              }
            >
              <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
              Must Be "Male" Or "Female".
            </p>
          </Form.Group>

          {console.log(gender)}

          <Button variant="warning" type="submit" className="mt-2 mb-2">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Changeprofile;
