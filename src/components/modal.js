import React from 'react'
import styles from './modal.module.css'
export default function Modal({children,onClick}) {
  return (
    <div>
        <div className={styles.modal}>{children}</div>
        <div className={styles.overlay} onClick={onClick}></div>
    </div>
  )
}
