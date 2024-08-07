import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

const Locations = () => {
  return (
    <>
        <div className="wbpg">
            <Header/>
            <div className="main">
                <div className="container">
                    <div className="hdr">All Item Categories</div>
                    <div className="ops">
                        <NavLink to="/admin/masters/loc/country" className='btn btn-info'>Countries</NavLink>
                        <NavLink to="/admin/masters/loc/state" className='btn btn-info'>States</NavLink>
                        <NavLink to="/admin/masters/loc/district" className='btn btn-info'>Districts</NavLink>
                    </div>
                    <div className="content"></div>
                </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default Locations