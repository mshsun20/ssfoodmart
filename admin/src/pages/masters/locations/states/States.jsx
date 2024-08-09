import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import axios from 'axios'
import Server from '../../../../Server'

const States = () => {
  const [stt, setStt] = useState()

  const getDta = async () => {
    try {
      const res = await axios.get(`${Server}/masters/locm/sttm/fetch`)
      const dta = await res.data
      console.log(dta)

      if (dta.statuscode === 220) {
        setStt(dta.data)
      }
      else {
        setStt(null)
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
                    <div className="hdr">All States</div>
                    <div className="ops">
                      <NavLink to="/admin/masters/loc/state/add" className='btn btn-primary'>Add New</NavLink>
                      <NavLink to="/admin/masters/loc" className='btn btn-warning'>Back</NavLink>
                    </div>
                    <div className="content">
                      {
                        stt&&(stt.length>0)&&(
                          <table className='table table-striped table-hover'>
                            <thead>
                              <tr>
                                <th>Code</th>
                                <th>State</th>
                                <th>Country</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                stt.map((elm, i) => (
                                  <tr key={elm._id}>
                                    <td>{elm.stt_code}</td>
                                    <td>{elm.stt_name}</td>
                                    <td>{elm.cntry&&elm.cntry.cntry_name}</td>
                                  </tr>
                                ))
                              }
                              <tr>
                                <td></td>
                              </tr>
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

export default States