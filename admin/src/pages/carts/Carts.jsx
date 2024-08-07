import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/Carts.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'
import { RiEditBoxFill } from "react-icons/ri";
import { IoIosRemoveCircle } from "react-icons/io"

const Carts = () => {
    const [crt, setCrt] = useState()

    const getCrts = async () => {
        try {
            const res = await axios.get(`${Server}/cart/fetch`)
            const dta = await res.data
            // console.log(dta)

            if (dta.statuscode === 220) {
                setCrt(dta.data)
                // dta.data
            }
            else {
                setCrt(null)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => getCrts, [])

    const rmvCrt = async (e) => {
        console.log(e)

        try {
            const res = await axios.delete(`${Server}/cart/remove/`+e)
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
                    <div className="hdr">All Carts</div>
                    <div className="content">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Sl. No.</th>
                                    <th>Account</th>
                                    <th>No. of Items</th>
                                    <th>Net Qty</th>
                                    <th>Net Cost</th>
                                    <th>Status</th>
                                    <th>Added On</th>
                                    <th>Updated On</th>
                                    <th>Edit</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    crt&&crt.map((elm, i) => {
                                        let ntqty = 0, ntcst = 0
                                        elm.cart_store&&elm.cart_store.forEach((el, j) => {
                                            ntqty += el.cart_qty
                                        })
                                        elm.cart_store&&elm.cart_store.forEach((el, j) => {
                                            ntcst += el.cart_totlcost
                                        })

                                        return (<tr key={i}>
                                            <td>{i+1}</td>
                                            <td className='cntntnm'>{elm.cart_acc&&elm.cart_acc.user_fname}</td>
                                            <td>{elm.cart_store.length}</td>
                                            <td>{ntqty}</td>
                                            <td>{ntcst}</td>
                                            <td>{elm.cart_status}</td>
                                            <td>{new Date(elm.createdAt).toLocaleString()}</td>
                                            <td>{new Date(elm.updatedAt).toLocaleString()}</td>
                                            <td><NavLink to={`/admin/carts/edit/${elm._id}`}><RiEditBoxFill className='edtbtn' /></NavLink></td>
                                            <td><button onClick={() => rmvCrt(elm._id)}><IoIosRemoveCircle className='rmvbtn' /></button></td>
                                        </tr>)
                                    })
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

export default Carts