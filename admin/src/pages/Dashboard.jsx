import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Dashboard = () => {
    let name, value

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