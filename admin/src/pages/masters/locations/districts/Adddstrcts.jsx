import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

const Adddstrcts = () => {
  return (
    <>
        <div className="wbpg">
            <Header/>
            <div className="main">
                <div className="container">
                    <div className="hdr">Add District</div>
                    <div className="ops">
                      <NavLink to="/admin/masters/loc/district" className='btn btn-danger'>Back</NavLink>
                    </div>
                    <div className="content"></div>
                </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default Adddstrcts