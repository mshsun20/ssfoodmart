import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../../style/Cart.css'
import axios from 'axios'
import Server from '../../Server'
import { loadStripe } from '@stripe/stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { rmvItm, dltAllItm } from '../../rtk/slices/CartSlice'
import { RiEditBoxFill } from "react-icons/ri";
import { IoIosRemoveCircle } from "react-icons/io"
import { FaCartArrowDown } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md"


const Cartdet = () => {
    const dispatch = useDispatch()
    const usrstate = useSelector((state) => state.prstreduc.users)
    const cartState = useSelector((state) => state.prstreduc.carts)
    const [crt, setCrt] = useState([])
    const [netItm, setNetItm] = useState(0)
    const [netCost, setNetCost] = useState(0)
    let qty = 0, cst = 0

    const ftchDta = async () => {
        // console.log(usrstate[0]._id)
        try {
            const res = await axios.get(`${Server}/cart/fetch`)
            const dta = await res.data
            // console.log(dta.data)
            for (let i=0; i<dta.data.length; i++) {
                if (String(dta.data[i].cart_acc._id) === String(usrstate[0]._id)) {
                    setCrt(dta.data[i].cart_store)
                    for (let j=0; j<dta.data[i].cart_store.length; j++) {
                        qty += parseInt(dta.data[i].cart_store[j].cart_qty)
                        cst += parseInt(dta.data[i].cart_store[j].cart_totlcost)
                    }
                }
            }
            setNetItm(qty)
            setNetCost(cst)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        ftchDta()
    }, [])
    
    const rmvFrmCart = async (e) => {
        try {
            const res = await axios.delete(`${Server}/cart/remove/`+e)
            const dta = await res.data
            // console.log(dta)

            if (dta.statuscode === 220) {
                window.alert(dta.success)
                dispatch(rmvItm(e))
                window.location.reload()
            }
            else {
                window.alert(dta.error)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const makePayment = async () => {
        try {
            const stripe = await loadStripe("pk_test_51NkrY2SIWidzutwnkbgI76yefQmQMsy3WSIT8JlcE83b67t0yb6YKAaUJEK32Nvz6MEBJAMhp9rDCJMlrEgkwMYc00INqHkirr")

            const res = await axios.post(`${Server}/cart/checkout`, {products:crt&&crt})
            const dta = await res.data
            const result = stripe.redirectToCheckout({
                sessionId:dta.id
            })

            if(result.error){
                console.log(result.error)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const dltallcrt = async (e) => {
        e.preventDefault()

        try {
            if (window.confirm(`Confirm Clear All ...!`)) {
                const res = await axios.delete(`${Server}/cart/removeall`)
                const dta = await res.data
                // console.log(dta)

                if (dta.statuscode === 220) {
                    window.alert(dta.success)
                    dispatch(dltAllItm())
                    window.location.reload()
                }
                else {
                    window.alert(dta.error)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
        <div className="wbpg">
            <div className="main">
                <div className="cartcnt container">
                    <div className="crthdr">Your Cart Details</div>
                    <div className="crtdtl">
                        <div className="crttbl">
                            {
                                crt&&(crt.length>0) ? (
                                    <table className='crt table table-striped table-hover'>
                                        <thead className='fs-6'>
                                            <tr>
                                                <th>Sl. No.</th>
                                                <th>Item Details</th>
                                                <th>Cost of Each Item</th>
                                                <th>Quantity</th>
                                                <th>Total Cost</th>
                                                <th>Edit</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                crt.map((elm, i) => (
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{elm.cart_item&&(
                                                            <div className='itmdtl'>
                                                                <div className="itmimg">
                                                                    <NavLink to={`/edtdet/${elm.cart_item&&elm.cart_item.item_name}`}>
                                                                        <img src={elm.cart_item.item_album[0].item_image} alt="Item_Image" />
                                                                    </NavLink>
                                                                </div>
                                                                <div className="itmcntnt">
                                                                    <div className="itmnm"><NavLink to={`/edtdet/${elm.cart_item&&elm.cart_item.item_name}`}>{elm.cart_item.item_name}</NavLink></div>
                                                                    <div className="itminfo">{elm.cart_item.item_detl}</div>
                                                                    <div className="itmratng"><span className='lbl'>Rating:</span>&nbsp;<span className='vlu'>{elm.cart_item.item_rating}</span></div>
                                                                </div>
                                                            </div>
                                                        )}</td>
                                                        <td>{elm.cart_item&&elm.cart_item.item_price}</td>
                                                        <td>{elm.cart_qty}</td>
                                                        <td style={{fontWeight:'bold'}}>{elm.cart_totlcost}</td>
                                                        <td><NavLink to={`/edtdet/${elm.cart_item&&elm.cart_item.item_name}`}><RiEditBoxFill className='edtbtn' /></NavLink></td>
                                                        <td><button onClick={() => rmvFrmCart(elm.cart_item&&elm.cart_item.item_code)}><IoIosRemoveCircle className='rmvbtn' /></button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                ) : null
                            }
                        </div>
                        <div className="crtinfo">
                            <div className="crtsumry">
                                <div className="frmgrp">
                                    <label htmlFor="netamt">Net Amount</label>
                                    <input type="text" name="netamt" id="netamt" value={netItm&&netItm} readOnly disabled />
                                </div>
                                <div className="frmgrp">
                                    <label htmlFor="netcst">Net Cost</label>
                                    <input type="text" name="netcst" id="netcst" value={netCost&&netCost} readOnly disabled />
                                </div>
                            </div>
                            <div className="crtbtn">
                                <button className='pybtn' onClick={makePayment}><FaCartArrowDown className='payr' /></button>
                                <button className='dltbtn' onClick={dltallcrt}><MdDeleteForever className='dltr' /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Cartdet