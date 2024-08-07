import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

const Districts = () => {
  return (
    <>
        <div className="wbpg">
            <Header/>
            <div className="main">
                <div className="container">
                    <div className="hdr">All Districts</div>
                    <div className="ops">
                      <NavLink to="/admin/masters/loc/district/add" className='btn btn-primary'>Add New</NavLink>
                      <NavLink to="/admin/masters/loc" className='btn btn-warning'>Back</NavLink>
                    </div>
                    <div className="content">
                      <table className='table table-striped table-hover'>
                        <thead>
                          <tr>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default Districts