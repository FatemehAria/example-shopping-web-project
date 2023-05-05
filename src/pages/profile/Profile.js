import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../action';

const Profile = () => {
  const {userData} = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getProfile());
  },[])

  return (
    <div>
    <Card className="text-center w-75 mx-auto mt-2 mb-2">
      <Card.Header className='bg-secondary fw-semibold text-light'>My Profile</Card.Header>
      <Card.Body>
        <Card.Text>
        {
          Object.keys(userData).map((item) => (
          <>
            <img src={userData[item].image} className="w-25 h-25 rounded"/>
            <p>{userData[item].email}</p>
            <p>{userData[item].username}</p>
            <p>{userData[item].mobile}</p>
            <p>{userData[item].firstname}</p>
            <p>{userData[item].lastname}</p>
            <p>{userData[item].gender}</p>
            <p>{userData[item].age}</p>
            <p>{userData[item].city}</p>
          </>
          ))
      }
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Profile;
