import React from 'react'
import styles from './button.module.css'
export default function Button({children,type,onClick}) {
  return (
    <button className={`${styles.button} ${styles[type]}`} onClick={onClick}>{children}</button>
  )
}
