import { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'

const Itmdtl = () => {
    const {id} = useParams()
    const [itm, setItm] = useState()
    // const [phto, setPhto] = useState()

    const getPhto = async () => {
        try {
            const res = await axios.get(`${Server}/item/fetchbyid/`+id)
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
    useEffect(() => getPhto, [])

  return (
    <>
        <div className="wbpg">
            <Header />
            <div className="main">
                <nav className='brdcrmb' aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><NavLink to="/admin/items/all">Items</NavLink></li>
                        <li className="breadcrumb-item" aria-current="page">{itm&&itm.item_name}</li>
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
                                                    <NavLink to={`/admin/items/image/add/${itm._id}`}>
                                                        <img src={elm.item_image} className="d-block w-100" alt="Item-detl" />
                                                    </NavLink>
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
                                        <p className="card-text">{itm.item_detl}</p>
                                        <p className="card-text"><span style={{fontWeight:'bold'}}>Type:&nbsp;</span><span>{itm.item_type}</span></p>
                                        <div className="crdvl">
                                            <div className='crdcst'>Price:&nbsp;<span className='prc'>{itm.item_price}</span><span className='unt'>₹</span></div>
                                            <div className="crdrt">Rating:&nbsp;<span className='rt'>{itm.item_rating}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    </>
  )
}

export default Itmdtl