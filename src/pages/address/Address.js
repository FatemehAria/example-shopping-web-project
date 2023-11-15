import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addressSubmission } from "../../action";
import styles from "./address.module.css";

const address_reg = /^[\w ]{11}$/;
const mobile_reg = /^(09)\d{9}$/;

const Address = () => {
  const { errmsg, offscreen, hide, instructions, valid, invalid } = styles;
  const [focus, setFocus] = useState(false);
  const { city, address, postalcode, phonenumber } = useSelector(
    (state) => state.address
  );
  const dispatch = useDispatch();

  const [validAddress, setValidAddress] = useState(false);
  const [validMobile, setValidMobile] = useState(false);

  useEffect(() => {
    const result = address_reg.test(address);
    setValidAddress(result);
  }, [address]);

  useEffect(() => {
    const result = mobile_reg.test(phonenumber);
    setValidMobile(result);
  }, [phonenumber]);

  return (
    <div>
      <Form className="w-50 mx-auto mt-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h2>Address</h2>

          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your City"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(e) =>
              dispatch(
                addressSubmission({
                  city: e.target.value,
                  address: "",
                  postalcode: "",
                  phonenumber: "",
                })
              )
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Address
            <FontAwesomeIcon
              icon={faCheck}
              className={validAddress ? `${valid}` : `${hide}`}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={faTimes}
              className={validAddress || !address ? `${hide}` : `${invalid}`}
            ></FontAwesomeIcon>
          </Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter Your Address"
            maxLength="11"
            onChange={(e) =>
              dispatch(
                addressSubmission({
                  city: city,
                  address: e.target.value,
                  postalcode: "",
                  phonenumber: "",
                })
              )
            }
            required
            aria-invalid={validAddress ? "false" : "true"}
            aria-describedby="adressnote"
          />
          <p
            id="addressnote"
            className={
              !validAddress && address ? `${instructions}` : `${offscreen}`
            }
          >
            <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
            Must Contain 11 Characters
          </p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Postal Code"
            onChange={(e) =>
              dispatch(
                addressSubmission({
                  city: city,
                  address: address,
                  postalcode: e.target.value,
                  phonenumber: "",
                })
              )
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Phone Number
            <FontAwesomeIcon
              icon={faCheck}
              className={validMobile ? `${valid}` : `${hide}`}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={faTimes}
              className={validMobile || !phonenumber ? `${hide}` : `${invalid}`}
            ></FontAwesomeIcon>
          </Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter Your Phone Number"
            onChange={(e) =>
              dispatch(
                addressSubmission({
                  city: city,
                  address: address,
                  postalcode: postalcode,
                  phonenumber: e.target.value,
                })
              )
            }
            maxLength="11"
            required
            aria-invalid={validMobile ? "false" : "true"}
            aria-describedby="mobilenote"
          />
          <p
            id="mobilenote"
            className={
              !validMobile && phonenumber ? `${instructions}` : `${offscreen}`
            }
          >
            <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
            {`Must Begin With (09) And Be Exactly 11 Digits.`}
          </p>
        </Form.Group>
      </Form>
      <Button
        as={Link}
        to="/checkout"
        className="text-light"
        type="submit"
        variant="warning"
        disabled={!validAddress || !validMobile ? true : false}
      >
        Next
      </Button>
    </div>
  );
};

export default Address;
