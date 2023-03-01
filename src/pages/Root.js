import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header'

export default function Root() {
  return (
    <>
    <Header/>
    <main>
        <Outlet/>
    </main>
    </>
  )
}
