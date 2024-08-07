import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'
import { RiEditBoxFill } from "react-icons/ri";
import { IoIosRemoveCircle } from "react-icons/io"

const Users = () => {
    const [usr, setUsr] = useState()

    const getUsrs = async () => {
        try {
            const res = await axios.get(`${Server}/user/fetch`)
            const dta = await res.data
            console.log(dta)

            if (dta.statuscode === 220) {
                setUsr(dta.data)
            }
            else {
                setUsr(null)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => getUsrs, [])

    const rmvUsr = async (e) => {
        try {
            const res = await axios.delete(`${Server}/user/remove/`+e)
            const dta = await res.data
            // console.log(dta)

            if (dta.statuscode === 220) {
                window.alert(dta.success)
                window.location.reload()
            }
            else {
                window.alert(dta.error)
            }
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
        <div className="wbpg">
            <Header />
            <div className="main">
                <div className="container">
                    <div className="hdr">All Items</div>
                    <div className="content">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Sl. No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Added On</th>
                                    <th>Updated On</th>
                                    <th>Edit</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usr&&usr.map((elm, i) => (
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td className='cntntnm'><NavLink to={`/admin/users/details/${elm._id}`}>{elm.user_fname}</NavLink></td>
                                            <td>{elm.user_email}</td>
                                            <td>{elm.user_phn}</td>
                                            <td>{elm.user_addr}</td>
                                            <td>{new Date(elm.createdAt).toLocaleString()}</td>
                                            <td>{new Date(elm.updatedAt).toLocaleString()}</td>
                                            <td><NavLink to={`/admin/users/edit/${elm._id}`}><RiEditBoxFill className='edtbtn' /></NavLink></td>
                                            <td><button onClick={() => rmvUsr(elm._id)}><IoIosRemoveCircle className='rmvbtn' /></button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    </>
  )
}

export default Users