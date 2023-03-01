import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from '../store/AuthContext'
import Button from './button'
import styles from './header.module.css'

export default function Header() {
  const navigate = useNavigate()
  const {logout,isLoggin}=useContext(AuthContext)
  const loggOut =()=>{
logout()
navigate('/items')
  }
  return (
    <header className={styles.header}>
        <div className={styles.logo} >The Logo</div>
        <div className={styles.navList} >
            <nav>
              {/* <Link to="/details">here</Link> */}
                <ul className={styles.ul}>
                    <li><NavLink className={({isActive})=>isActive?styles.active:styles.link}  to='/items'>Items</NavLink></li>
                   {!isLoggin && <li><NavLink className={({isActive})=>isActive?styles.active:styles.link} to='/login'>Login</NavLink></li>}
                    <li><NavLink className={({isActive})=>isActive?styles.active:styles.link} to='/fav'>Favorite</NavLink></li>
                   {isLoggin && <li><Button type={'cancel'} onClick={loggOut}>Logout</Button></li>}
                </ul>
            </nav>
        </div>
    </header>
  )
}
