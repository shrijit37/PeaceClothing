import React from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router'
const SpecificProductPage = () => {
    const {id,title} = useParams();
  return (
    <div>
        <Navbar/>
        <h1>{id}</h1>
        <h2>{title}</h2>

    </div>
  )
}

export default SpecificProductPage