import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import Server from '../Server'

const Dashboard = () => {
    const getdta = async () => {
      try {
        const res = await axios.get(`${Server}/account/fetch`)
        const dta = await res.data
        console.log(dta)
      } catch (error) {
        console.error(error)
      }
    }
    useEffect(() => getdta, [])

  return (
    <>
        <div className="wbpg">
          <Header />
          <div className="main">Dashboard page</div>
          <Footer />
        </div>
    </>
  )
}

export default Dashboard