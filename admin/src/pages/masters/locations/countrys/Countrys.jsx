import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import axios from 'axios'
import Server from '../../../../Server'

const Countrys = () => {
  const [cntry, setCntry] = useState()

  const getDta = async () => {
    try {
      const res = await axios.get(`${Server}/masters/locm/cntrym/fetch`)
      const dta = await res.data
      console.log(dta)

      if (dta.statuscode === 220) {
        setCntry(dta.data)
      }
      else {
        console.log('Error fetching data')
      }
    } catch (error) {
      console.log('Error fetching data', error)
    }
  }
  useEffect(() => getDta, [])

  return (
    <>
        <div className="wbpg">
            <Header/>
            <div className="main">
                <div className="container">
                    <div className="hdr">All Countries</div>
                    <div className="ops">
                      <NavLink to="/admin/masters/loc/country/add" className='btn btn-primary'>Add New</NavLink>
                      <NavLink to="/admin/masters/loc" className='btn btn-warning'>Back</NavLink>
                    </div>
                    <div className="content">
                      {
                        cntry&&(cntry.length>0)&&(
                          <table className='table table-striped table-hover'>
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Info</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                cntry.map((elm, i) => (
                                  <tr key={i}>
                                    <td>{elm.cntry_name}</td>
                                    <td>{elm.cntry_code}</td>
                                    <td>{elm.cntry_info}</td>
                                  </tr>
                                ))
                              }
                            </tbody>
                          </table>
                        )
                      }
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default Countrys