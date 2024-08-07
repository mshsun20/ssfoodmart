import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

const Addcategs = () => {
  return (
    <>
        <div className="wbpg">
            <Header/>
            <div className="main">
                <div className="container">
                    <div className="hdr">Add Category</div>
                    <div className="ops">
                        <NavLink to="/admin/masters/category" className='btn btn-warning'>Back</NavLink>
                    </div>
                    <div className="content"></div>
                </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default Addcategs