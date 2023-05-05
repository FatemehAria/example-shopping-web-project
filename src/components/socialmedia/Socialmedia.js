import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./socialmedia.module.css";
import { Nav } from "react-bootstrap";

const Socialmedia = () => {
  const { icons, text, textPositioning } = styles;
  return (
    <Nav className="w-75 ms-5">
      <Nav.Item>
        <FontAwesomeIcon
          icon={faInstagram}
          className="fa-sm me-2 ms-2"
        ></FontAwesomeIcon>
      </Nav.Item>
      <Nav.Item>
        <FontAwesomeIcon
          icon={faFacebook}
          className="fa-sm me-2"
        ></FontAwesomeIcon>
      </Nav.Item>
      <Nav.Item>
        <FontAwesomeIcon
          icon={faTwitter}
          className="fa-sm me-2"
        ></FontAwesomeIcon>
      </Nav.Item>
      <Nav.Item className={textPositioning}>
        <span className={text}>Contact us via +989129856423</span>
      </Nav.Item>
    </Nav>
  );
};

export default Socialmedia;
