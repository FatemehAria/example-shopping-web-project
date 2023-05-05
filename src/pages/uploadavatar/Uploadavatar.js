import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../../components/sidebar/Sidebar";

const Uploadavatar = () => {
  const [pic, setPic] = useState(null);
  const [picsuccess, setPicsuccess] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  const uploadAvatar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile-image", pic);
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/profile-image",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setPicsuccess(true);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text:  `${error.response.data.message}`.toUpperCase(),
      })
    }
  };
  return (
    <div>
      <Sidebar />
      {picsuccess ? (
        (Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Profile Uploaded!",
          showConfirmButton: false,
          timer: 1500,
        }),
        navigate("/profile"))
      ) : (
        <Form className="w-50 mx-auto mt-5" onSubmit={uploadAvatar}>
          <Form.Group className="mb-3">
            <Form.Label>Upload Photo</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setPic(e.target.files[0])}
            />
          </Form.Group>
          <Button variant="warning" type="submit">
            Upload
          </Button>
          <div
            className="w-100 h-50 mt-5 "
            style={{ marginLeft: "7.5rem" }}
          ></div>
        </Form>
      )}
    </div>
  );
};

export default Uploadavatar;
