import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Server from '../../Server'
import Cardsdata from '../../data/CardData'
import { useDispatch } from 'react-redux'
import { loadItm } from '../../rtk/slices/CartSlice'

const Items = () => {
    const dispatch = useDispatch()
    const [itm, setItm] = useState()

    const storItms = async () => {
        // console.log(itm)

        try {
            Cardsdata.forEach(async (elm, i) => {
                const {id, dish, imgdata, address, somedata, price, rating, qnty} = elm
                const res = await axios.post(`${Server}/item/add`, {item_code:id, item_name:dish, item_detl:somedata, item_desc:somedata, item_image:imgdata, item_type:address, item_price:price, item_rating:rating, item_qty:qnty})
                const dta = await res.data
                // console.log(dta)
            })
        } catch (error) {
            console.error(error)
        }
    }
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
    const UpdtCrtState = async () => {
        try {
            const res = await axios.get(`${Server}/cart/fetch`)
            const dta = await res.data
            // console.log(dta.data)
            if (dta.statuscode === 220) {
                dispatch(loadItm(dta.data))
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        storItms()
        getItms()
        // UpdtCrtState()
        setTimeout(() => {
            UpdtCrtState()
        }, 3500)
    }, [])
    
  return (
    <>
        <div className="wbpg">
            <div className="main">
                <div className="hdr">All Items</div>
                {/* <button onClick={storItms}>push</button> */}
                <div className="cardgrp">
                    <div className="cards row row-cols-1 row-cols-md-2 g-4">
                        {
                            (itm)&&itm.map((elm, i) => (
                                <div className="cardelm col" key={i}>
                                    <div className="card">
                                        <NavLink className="card-img" to={`/itemdet/${elm.item_name}`}>
                                            <img src={elm.item_album&&elm.item_album[0].item_image} className="card-img-top" alt="Card-Item" />
                                        </NavLink>
                                        <div className="card-body">
                                            <NavLink className="card-title" to={`/itemdet/${elm.item_name}`}>{elm.item_name}</NavLink>
                                            <p className="card-text">{elm.item_desc}</p>
                                            <div className="crdvl">
                                                <div className='crdcst'>Price:&nbsp;<span className='prc'>{elm.price}</span><span className='unt'>₹</span></div>
                                                <div className="crdrt">Rating:&nbsp;<span className='rt'>{elm.item_rating}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Items