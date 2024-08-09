import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import axios from 'axios'
import Server from '../../../../Server'

const Addstts = () => {
  const [vl, setVl] = useState({stt_code:'', stt_name:'', stt_info:'', cntry:''})
  const [cntry, setCntry] = useState()
  const navig = useNavigate()
  let name, value

  const getCntry = async () => {
    try {
      const res = await axios.get(`${Server}/masters/locm/cntrym/fetch`)
      const dta = await res.data

      if (dta.statuscode === 220) {
        setCntry(dta.data)
      }
      else {
        setCntry(null)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => getCntry, [])

  const hndlinp = (e) => {
    name = e.target.name
    value = e.target.value
    setVl({...vl, [name]:value})
  }

  const hndlsub = async (e) => {
    e.preventDefault()
    const {stt_code, stt_name, stt_info, cntry} = vl
    console.log(vl)

    try {
      // Add your API call here
      const res = await axios.post(`${Server}/masters/locm/sttm/add`, {stt_code, stt_name, stt_info, cntry})
      const dta = await res.data
      console.log(dta)

      if (dta.statuscode === 220) {
        // Handle success
        alert(dta.message)
        navig('/admin/masters/loc/state')
      } else {
        // Handle error
        alert(dta.message)
      }      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
        <div className="wbpg">
            <Header/>
            <div className="main">
                <div className="container">
                    <div className="hdr">Add State</div>
                    <div className="ops">
                      <NavLink to="/admin/masters/loc/state" className='btn btn-danger'>Back</NavLink>
                    </div>
                    <div className="content">
                      <form className="frm">
                        <div className="form-group">
                          <label>State Code:</label>
                          <input type="text" name='stt_code' id='stt_code' className="form-control" placeholder="Enter state code" onChange={hndlinp}/>
                        </div>
                        <div className="form-group">
                          <label>State Name:</label>
                          <input type="text" name='stt_name' id='stt_name' className="form-control" placeholder="Enter state name" onChange={hndlinp}/>
                        </div>
                        <div className="form-group">
                          <label>State Info:</label>
                          <input type="text" name='stt_info' id='stt_info' className="form-control" placeholder="Enter state info" onChange={hndlinp}/>
                        </div>
                        <div className="form-group">
                          <label>Country:</label>
                          <select name="cntry" id="cntry" className="form-select">
                            <option value="0">-----Select Country-----</option>
                            {
                              cntry&&cntry.map((elm, i) => (
                                <option value={elm._id} key={i}>{elm.cntry_name}</option>
                              ))
                            }
                            {
                              // cntry&&(
                              //   <>
                              //     <option value="0">-----Select Country-----</option>
                              //     {
                              //       cntry.map((elm, i) => (
                              //         <option value={elm._id} key={i}>{elm.cntry_name}</option>
                              //       ))
                              //     }
                              //   </>
                              // )
                            }
                          </select>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={hndlsub}>Submit</button>
                      </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default Addstts