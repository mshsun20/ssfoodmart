import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/Items.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'
import { RiEditBoxFill } from "react-icons/ri";
import { IoIosRemoveCircle } from "react-icons/io"

const Items = () => {
    const [itm, setItm] = useState()

    const getItms = async () => {
        try {
            const res = await axios.get(`${Server}/item/fetch`)
            const dta = await res.data
            // console.log(dta)

            if (dta.statuscode === 220) {
                setItm(dta.data)
            }
            else {
                setItm(null)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => getItms, [])

    const rmvItm = async (e) => {
        console.log(e)

        try {
            const res = await axios.delete(`${Server}/item/remove/`+e)
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
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Type</th>
                                    <th>Rating</th>
                                    <th>Added On</th>
                                    <th>Updated On</th>
                                    <th>Edit</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    itm&&itm.map((elm, i) => (
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td className='cntntnm'>{elm.item_name}</td>
                                            <td className='imag'><NavLink to={`/admin/items/details/${elm._id}`}><img src={elm.item_album[0].item_image} alt="Photos" /></NavLink></td>
                                            <td>{elm.item_price}</td>
                                            <td>{elm.item_type}</td>
                                            <td className='cntntratng'>{elm.item_rating}</td>
                                            <td>{new Date(elm.createdAt).toLocaleString()}</td>
                                            <td>{new Date(elm.updatedAt).toLocaleString()}</td>
                                            <td><NavLink to={`/admin/items/edit/${elm._id}`}><RiEditBoxFill className='edtbtn' /></NavLink></td>
                                            <td><button onClick={() => rmvItm(elm._id)}><IoIosRemoveCircle className='rmvbtn' /></button></td>
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

export default Items