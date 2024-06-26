import { useState, useEffect } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import Cardsdata from '../../data/CardData'
import { useSelector, useDispatch } from 'react-redux'
import { loadCnt, cntrInc, cntrDec } from '../../rtk/slices/UpdtCntSlice'
import axios from 'axios'
import Server from '../../Server'

const Updtitm = () => {
    const {itmnm} = useParams()
    const [itm, setItm] = useState()
    const usrstate = useSelector((state) => state.prstreduc.users)
    const itmState = useSelector((state) => state.prstreduc.updtcnts.value)
    const cartState = useSelector((state) => state.prstreduc.carts)
    const dispatch = useDispatch()
    const navig = useNavigate()

    const getCrt = async () => {
        // console.log(cartState)
        try {
            let Usrtokn = localStorage.getItem('User')
            let Usrdta = JSON.parse(Usrtokn)
            // console.log(Usrdta)
            if (Usrdta&&(cartState[0].length > 0)) {
                for (let i=0; i<cartState[0].length; i++) {
                    if (String(Usrdta._id) === String(cartState[0][i].cart_acc._id)) {
                        for (let j=0; j<cartState[0][i].cart_store.length; j++) {
                            if (String(itmnm) === String(cartState[0][i].cart_store[j].cart_item.item_name)) {
                                dispatch(loadCnt(cartState[0][i].cart_store[j].cart_qty))
                            }
                        }
                    }
                }
            }
            else {
                localStorage.removeItem('User')
            }
        } catch (error) {
            console.error(error)
        }
    }
    const getDta = () => {
        try {
            Cardsdata.forEach(async (elm, i) => {
                if (String(elm.dish) === String(itmnm)) {
                    const res = await axios.get(`${Server}/item/fetchbyname/`+String(itmnm))
                    const dta = await res.data
                    // console.log(dta)

                    if (dta.statuscode === 220) {
                        setItm(dta.data)
                    }
                    else {
                        setItm(null)
                    }
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getCrt()
        getDta()
    }, [])

    const edtCrt = async (e) => {
        e.preventDefault()
        const payload = {user:usrstate&&usrstate[0], item:itm, quantity:itmState, totalCost:(parseInt(itm.item_price)*parseInt(itmState))}

        try {
            const res = await axios.put(`${Server}/cart/update/`+itmnm, payload)
            const dta = await res.data
            // console.log(dta)

            if (dta.statuscode === 220) {
                window.alert(dta.success)
                navig('/cartdet')
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
            <div className="main">
                <nav className='brdcrmb' aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><NavLink to="/">Items</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">{itm&&itm.item_name}</li>
                    </ol>
                </nav>
                <div className="cntnr">
                    {
                        (itm)&&(
                            <div className="dtlsec">
                                <div id="carouselExampleIndicators" className="carousel slide">
                                    <div className="carousel-indicators">
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    </div>
                                    <div className="carousel-inner">
                                        {
                                            (itm.item_album)&&(itm.item_album.map((elm, i) => (
                                                <div className="carousel-item active" key={i}>
                                                    <img src={elm.item_image} className="d-block w-100" alt="Item-detl" />
                                                </div>
                                            )))
                                        }
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                                <div className="bdy">
                                    <div className="hds">{itm.item_name}</div>
                                    <div className="dtl">
                                        <span className="card-text">{itm.item_detl}</span>
                                        <div className="crdvl">
                                            <div className='crdcst'>Price:&nbsp;<span className='prc'>{itm.item_price}</span><span className='unt'>₹</span></div>
                                            <div className="crdrt">Rating:&nbsp;<span className='rt'>{itm.item_rating}</span></div>
                                        </div>
                                        {
                                            (usrstate)&&(usrstate.length>0)&&(
                                                <>
                                                    <div className="crdact row g-1">
                                                        <div className='col-auto'>
                                                            <button className='btn btn-danger' onClick={() => dispatch(cntrDec())}>-</button>
                                                        </div>
                                                        <div className='col-auto'>
                                                            <input className=' form-control' type="text" name="" id="" value={itmState} readOnly />
                                                        </div>
                                                        <div className='col-auto'>
                                                            <button className='btn btn-success' onClick={() => dispatch(cntrInc())}>+</button>
                                                        </div>
                                                    </div>
                                                    <div className="crdbtn">
                                                        <button className='btn btn-primary' onClick={edtCrt}>Add to Cart</button>
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                {/* <div className="cardgrp">
                    <div className="carddtls row row-cols-1 row-cols-md-2 g-4">
                        {
                            (itm)&&(
                                <div className="cardelm col">
                                    <div className="card">
                                        <img src={itm.item_album[0].item_image} className="card-img-top" alt="Card-Item" />
                                        <div className="card-body">
                                            <h3 className="card-title">{itm.item_name}</h3>
                                            <p className="card-text">{itm.item_detl}</p>
                                            <div className="crdvl">
                                                <div className='crdcst'>Price:&nbsp;<span className='prc'>{itm.item_price}</span><span className='unt'>₹</span></div>
                                                <div className="crdrt">Rating:&nbsp;<span className='rt'>{itm.item_rating}</span></div>
                                            </div>
                                            <div className="crdact">
                                                <button onClick={() => dispatch(cntrDec())}>-</button>
                                                <input type="text" name="" id="" value={itmState&&itmState} readOnly />
                                                <button onClick={() => dispatch(cntrInc())}>+</button>
                                            </div>
                                            <div className="crdbtn">
                                              <button onClick={edtCrt}>Update Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div> */}
            </div>
        </div>
    </>
  )
}

export default Updtitm