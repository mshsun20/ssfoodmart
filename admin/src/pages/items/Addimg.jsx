import { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'

const Addimg = () => {
    const {id} = useParams()
    const [itm, setItm] = useState()
    const [vl, setVl] = useState()

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

    const hndlsub = async (e) => {
        e.preventDefault()

        try {
            if (!vl) {
                window.alert(`Image Link shouldn't be blank ...!!`)
            }
            else if (!String(vl).startsWith('https://')) {
                window.alert(`Value should be an URL Link ...!!`)
            }
            else if (String(vl).length < 15) {
                window.alert(`Invalid URL ...!!`)
            }
            else {
                const res = await axios.put(`${Server}/item/image/add/`+id, {item_image:vl})
                const dta = await res.data
                // console.log(dta)

                if (dta.statuscode === 220) {
                    window.alert(dta.success)
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
            <Header />
            <div className="main">
                <nav className='brdcrmb' aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><NavLink to="/admin/items/all">Items</NavLink></li>
                        <li className="breadcrumb-item"><NavLink to={`/admin/items/details/${itm&&itm._id}`}>{itm&&itm.item_name}</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">All Images</li>
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
                                        <p className="card-text">Add More Images</p>
                                        <form  className="row g-3">
                                            <div className="col-auto">
                                                <label htmlFor="inputPassword2" className="visually-hidden">Image Link</label>
                                                <input type="url" className="form-control" id="inputPassword2" placeholder="Image Link" onChange={(e) => setVl(e.target.value)} />
                                            </div>
                                            <div className="col-auto">
                                                <button type="submit" className="btn btn-primary mb-3" onClick={hndlsub}>Add New</button>
                                            </div>
                                        </form>
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

export default Addimg