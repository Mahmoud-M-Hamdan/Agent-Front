import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './detailspage.module.css'
export default function DetailsPage() {
  const [item,setItem]=useState({})
  const params= useParams()
  useEffect(()=>{
    const getTheItem= async()=>{
      const id =params.id
const response = await fetch(`http://localhost:3000/items/${id}`)
const data = await response.json()
setItem(data)

    } 

    getTheItem()
  },[])
  return (
    <>
    <div className={styles.container}>
<div className={styles.titleContainer}>
  <p className={styles.title}>{item.name}</p>
</div>
    <div> 
      <p className={styles.details}>The Price: {item.price}</p>
      <p className={styles.details}>The Description: {item.price}</p>
    </div>
    </div>
    </>
  )
}
