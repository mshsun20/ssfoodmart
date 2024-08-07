import { useState, useEffect } from 'react'
import { useParams, NavLink, useNavigate } from 'react-router-dom'
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

const Edtcrtitm = () => {
    const {id} = useParams()
    // const dispatch = useDispatch()
    // const itmState = useSelector((state) => state.prstreduc.counters.value)
    const [usr, setUsr] = useState()
    const [crt, setCrt] = useState()
    const [itm, setItm] = useState()
    const [prc, setPrc] = useState(0)
    const [qty, setQty] = useState(1)
    const [totl, setTotl] = useState(0)
    const navig = useNavigate()
    let ntqty = 0, ntcst = 0

    const getCrts = async () => {
        try {
            const res = await axios.get(`${Server}/cartitm/fetch/`+id)
            const dta = await res.data
            // console.log(dta)

            if (dta.statuscode === 220) {
                setCrt(dta.data)
                setUsr(dta.data.cart_acc)
                setItm(dta.data.cart_store.filter(elm => String(elm._id) === String(id)))
                setPrc(dta.data.cart_store.filter(elm => String(elm._id) === String(id))[0].cart_item.item_price)
                setQty(dta.data.cart_store.filter(elm => String(elm._id) === String(id))[0].cart_qty)
                setTotl(dta.data.cart_store.filter(elm => String(elm._id) === String(id))[0].cart_totlcost)
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
        document.querySelector('.decbtn').style.display = 'inline-block'
        document.querySelector('.incbtn').style.display = 'inline-block'
        document.querySelector('.updtbtn').style.display = 'inline-block'
        document.querySelector('.cnclbtn').style.display = 'inline-block'
    }
    const hndlcncl = (e) => {
        e.preventDefault()
        document.querySelector('#cart_qty').disabled = true
        document.querySelector('.decbtn').style.display = 'none'
        document.querySelector('.incbtn').style.display = 'none'
        document.querySelector('.updtbtn').style.display = 'none'
        document.querySelector('.cnclbtn').style.display = 'none'
    }
    const hndlsub = async (e) => {
        const crtqty = qty
        const crttotl = parseInt(prc) * parseInt(qty)
        const itmnm = itm[0]&&itm[0].cart_item.item_name
        // console.log(crtqty)
        // console.log(crttotl)

        try {
            const res = await axios.put(`${Server}/cart/update/`+itmnm, {user:usr, item:itm[0].cart_item, quantity:crtqty, totalCost:crttotl})
            const dta = await res.data
            console.log(dta)

            if (dta.statuscode === 220) {
                window.alert(dta.success)
                window.location.reload()
                // navig(`/admin/carts/all`)
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
                        <li className="breadcrumb-item"><NavLink to="/admin/carts/all">Carts: {crt&&crt.cart_acc&&crt.cart_acc.user_fname}</NavLink></li>
                        <li className="breadcrumb-item" aria-current="page"><NavLink to={`/admin/carts/edit/${crt&&crt._id}`}>Items List</NavLink></li>
                        <li className="breadcrumb-item" aria-current="page">{itm&&itm[0].cart_item.item_name}</li>
                    </ol>
                </nav>
                <div className="cntnr">
                    {
                        (crt)&&(crt.cart_store)&&(
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total Cost</th>
                                        <th>Type</th>
                                        <th>Rating</th>
                                        <th>Added On</th>
                                        <th>Updated On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        itm[0]&&(
                                            <tr>
                                                <td className='cntntnm'>{itm[0].cart_item.item_name}</td>
                                                <td className='imag'><img src={itm[0].cart_item.item_album[0].item_image} alt="Photos" /></td>
                                                <td>
                                                    <button onClick={(e) => setQty(qty-1)}><TbSquareRoundedMinusFilled className='decbtn' /></button>
                                                    <button onClick={(e) => setQty(qty+1)}><TbSquareRoundedPlusFilled className='incbtn' /></button>
                                                    <input className='w-100' type="text" name="cart_qty" id="cart_qty" value={qty} onChange={(e) => setQty(e.target.value)} disabled={true} />
                                                    <button onClick={hndledt}><RiEditBoxFill className='edtbtn' /></button>
                                                    <button onClick={hndlsub}><MdChangeCircle className='updtbtn' /></button>
                                                    <button onClick={hndlcncl}><IoCloseCircle className='cnclbtn' /></button>
                                                </td>
                                                <td>{itm[0].cart_item.item_price}</td>
                                                <td>{itm[0].cart_totlcost}</td>
                                                <td>{itm[0].cart_item.item_type}</td>
                                                <td className='cntntratng'>{itm[0].cart_item.item_rating}</td>
                                                <td>{new Date(itm[0].cart_item.createdAt).toLocaleString()}</td>
                                                <td>{new Date(itm[0].cart_item.updatedAt).toLocaleString()}</td>
                                            </tr>
                                        )
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

export default Edtcrtitm