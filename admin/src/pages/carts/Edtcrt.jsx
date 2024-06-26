import { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import '../../styles/Carts.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'
import { useSelector, useDispatch } from 'react-redux'
// import { loadCnt, cntrInc, cntrDec } from '../../rtk/slices/UpdtCntSlice'
import { RiEditBoxFill } from "react-icons/ri";
import { MdChangeCircle } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io"
import { IoCloseCircle } from "react-icons/io5";
import { TbSquareRoundedPlusFilled, TbSquareRoundedMinusFilled } from "react-icons/tb";

const Edtcrt = () => {
    const {id} = useParams()
    // const dispatch = useDispatch()
    // const itmState = useSelector((state) => state.prstreduc.counters.value)
    const [inc, setInc] = useState(1)
    const [dec, setDec] = useState(1)
    const [vl, setVl] = useState(0)
    const [crt, setCrt] = useState()
    const [itm, setItm] = useState()
    let ntqty = 0, ntcst = 0

    const getCrts = async () => {
        try {
            const res = await axios.get(`${Server}/cart/fetch/`+id)
            const dta = await res.data
            // console.log(dta.data.cart_store)

            if (dta.statuscode === 220) {
                setCrt(dta.data)
                setItm(dta.data.cart_store)
            }
            else {
                setCrt(null)
                setItm(null)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => getCrts, [])

    const hndledt = (e) => {
        e.preventDefault()
        document.querySelector('#cart_qty').disabled = false
    }
    const hndlcncl = (e) => {
        e.preventDefault()
        document.querySelector('#cart_qty').disabled = true
    }
    const hndlsub = async (e) => {
        const crtqty = e.target.value
        console.log(crtqty)
    }

    const rmvItm = async (e) => {
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
                <nav className='brdcrmb' aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><NavLink to="/admin/carts/all">Cart: {crt&&crt.cart_acc&&crt.cart_acc.user_fname}</NavLink></li>
                        <li className="breadcrumb-item" aria-current="page">Items List</li>
                    </ol>
                </nav>
                <div className="cntnr">
                    {
                        (crt)&&(crt.cart_store)&&(
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Sl. No.</th>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total Cost</th>
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
                                                <td className='cntntnm'>{elm.cart_item.item_name}</td>
                                                <td className='imag'><img src={elm.cart_item.item_album[0].item_image} alt="Photos" /></td>
                                                <td>
                                                    {/* <button className='btn btn-danger' onClick={(e) => setVl(vl+1)}>-</button>
                                                    <button className='btn btn-success' onClick={(e) => setVl(vl-1)}>+</button> */}
                                                    <input type="text" name="cart_qty" id="cart_qty" value={elm.cart_qty} disabled={true} />
                                                    {/* <button onClick={hndledt}><RiEditBoxFill className='edtbtn' /></button>
                                                    <button onClick={hndlcncl}><IoCloseCircle className='cnclbtn' /></button>
                                                    <button onClick={hndlsub}><MdChangeCircle className='updtbtn' /></button> */}
                                                </td>
                                                <td>{elm.cart_item.item_price}</td>
                                                <td>{elm.cart_totlcost}</td>
                                                <td>{elm.cart_item.item_type}</td>
                                                <td className='cntntratng'>{elm.cart_item.item_rating}</td>
                                                <td>{new Date(elm.cart_item.createdAt).toLocaleString()}</td>
                                                <td>{new Date(elm.cart_item.updatedAt).toLocaleString()}</td>
                                                <td><NavLink to={`/admin/cartitms/edit/${elm._id}`}><RiEditBoxFill className='edtbtn' /></NavLink></td>
                                                <td><button onClick={() => rmvItm(elm.cart_item._id)}><IoIosRemoveCircle className='rmvbtn' /></button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    </>
  )
}

export default Edtcrt