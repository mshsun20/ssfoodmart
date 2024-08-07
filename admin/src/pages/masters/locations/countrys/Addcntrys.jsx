import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import axios from 'axios'
import Server from '../../../../Server'

const Addcntrys = () => {
  const [vl, setVl] = useState({cntry_name:'', cntry_code:'', cntry_info:''})
  const navig = useNavigate()
  let name, value

  const hndlinp = (e) => {
    name = e.target.name
    value = e.target.value
    setVl({...vl, [name]:value})
  }

  const hndlsub = async (e) => {
    e.preventDefault()
    const {cntry_name, cntry_code, cntry_info} = vl

    try {
      // Add your API call here
      const res = await axios.post(`${Server}/masters/locm/cntrym/add`, {cntry_name, cntry_code, cntry_info})
      const dta = await res.data
      console.log(dta)

      if (dta.statuscode === 220) {
        // Handle success
        alert(dta.message)
        navig('/admin/masters/loc/country')
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
                    <div className="hdr">Add Country</div>
                    <div className="ops">
                      <NavLink to="/admin/masters/loc/country" className='btn btn-danger'>Back</NavLink>
                    </div>
                    <div className="content">
                      <form className="frm">
                        <div className="form-group">
                          <label>Country Name:</label>
                          <input type="text" name='cntry_name' id='cntry_name' className="form-control" placeholder="Enter country name" onChange={hndlinp}/>
                        </div>
                        <div className="form-group">
                          <label>Country Code:</label>
                          <input type="text" name='cntry_code' id='cntry_code' className="form-control" placeholder="Enter country code" onChange={hndlinp}/>
                        </div>
                        <div className="form-group">
                          <label>Country Info:</label>
                          <input type="text" name='cntry_info' id='cntry_info' className="form-control" placeholder="Enter country code" onChange={hndlinp}/>
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

export default Addcntrys