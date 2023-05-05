import React from 'react'
import { Card } from 'react-bootstrap'
import Sidebar from '../../components/sidebar/Sidebar';
import styles from "./setting.module.css";

const Setting = () => {
  const {background} = styles;
  return (

      <span className='mt-2'><Sidebar/>
      <p className={background}></p>
      </span>

  )
}

export default Setting