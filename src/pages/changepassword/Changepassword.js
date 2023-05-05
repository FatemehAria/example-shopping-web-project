import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Sidebar from '../../components/sidebar/Sidebar'

const Changepassword = () => {
  const navigate = useNavigate();
  const [newpassword,setNewpassword] = useState();
  const [oldpassword,setOldpassword] = useState();
  const [successchange,setSuccesschange] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"));

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put("http://kzico.runflare.run/user/change-password",{
                old_password:`${oldpassword}`,
                new_password:`${newpassword}`
            },
            {
                headers:{
                    authorization:
                    `Bearer ${token}`
                },
            }
            )
            setSuccesschange(true);
            console.log(data)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text:  `${error.response.data.message}`.toUpperCase(),
      })

    }
  }
  return (
    <div>
    <Sidebar/>
    {
      successchange ? (
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Password Changed Successfult!',
          showConfirmButton: false,
          timer: 1500
        }),
        navigate("/profile")
      )
      :
      (
        <Form className='w-50 mx-auto mt-5' onSubmit={changePassword}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Old Password</Form.Label>
        <Form.Control type="text" placeholder="Enter The Old Password" onChange={(e) => setOldpassword(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control type="text" placeholder="Enter The New Password" onChange={(e) => setNewpassword(e.target
        .value)}/>
      </Form.Group>

      <Button variant="warning" type="submit">
        Done
      </Button>
    </Form>
      )
    }
      
    </div>
  )
}

export default Changepassword;