import { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'

const Additm = () => {
    const [cd, setCd] = useState(0)
    const [vl, setVl] = useState({item_name:'', item_detl:'', item_desc:'', item_image:'', item_type:'', item_price:0, item_rating:0, item_qty:0})
    let name, value

    const getItmcode = async () => {
        try {
            const res = await axios.get(`${Server}/item/fetch`)
            const dta = await res.data
            // console.log(dta)

            if (dta.statuscode === 200) {
                setCd(parseInt(dta.data.length))
            }
            else {
                setCd(0)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => getItmcode, [])

    const hndlinp = (e) => {
        name = e.target.name
        value = e.target.value
        setVl({...vl, [name]:value})
    }

    const hndlsub = async (e) => {
        e.preventDefault()
        const {item_name, item_detl, item_desc, item_image, item_type, item_price, item_rating, item_qty} = vl

        try {
            if (!item_name || !item_detl || !item_image || !item_price) {
                window.alert(`Manadatory Fields need to be filled ...!!`)
            }
            else if (!String(item_image).startsWith('https://')) {
                window.alert(`Link value should be an URL ...!!`)
            }
            else if (String(item_image).length < 15) {
                window.alert(`Invalid URL ...!!`)
            }
            else {
                const res = await axios.post(`${Server}/item/add/`, {item_code:(cd+1), item_name, item_detl, item_desc, item_image, item_type, item_price, item_rating, item_qty})
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
                <div className="hdr">Add New Item</div>
                <div className="cntnr">
                    <form className='frm'>
                        <div className="form-floating">
                            <input type="text" className="form-control" name='item_name' id="floatingInput" placeholder="nameexample" onChange={hndlinp} />
                            <label htmlFor="floatingInput">Name</label>
                        </div>
                        <div className="form-floating">
                            <textarea type="text" className="form-control" name='item_detl' id="floatingInput" placeholder="nameexample" onChange={hndlinp}></textarea>
                            <label htmlFor="floatingInput">Details</label>
                        </div>
                        <div className="form-floating">
                            <textarea type="text" className="form-control" name='item_desc' id="floatingInput" placeholder="nameexample" onChange={hndlinp}></textarea>
                            <label htmlFor="floatingInput">Description</label>
                        </div>
                        <div className="form-floating">
                            <textarea type="url" className="form-control" name='item_image' id="floatingInput" placeholder="nameexample" onChange={hndlinp}></textarea>
                            <label htmlFor="floatingInput">Image Link</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" name='item_type' id="floatingInput" placeholder="nameexample" onChange={hndlinp} />
                            <label htmlFor="floatingInput">Type</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" name='item_price' id="floatingInput" placeholder="name example" onChange={hndlinp} />
                            <label htmlFor="floatingInput">Price</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" name='item_rating' id="floatingInput" placeholder="nameexample" onChange={hndlinp} />
                            <label htmlFor="floatingInput">Rating</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" name='item_qty' id="floatingInput" placeholder="nameexample" onChange={hndlinp} />
                            <label htmlFor="floatingInput">Quantity</label>
                        </div>
                        
                        <button className="btn btn-primary w-100 py-2" type="submit" onClick={hndlsub}>Add New</button>
                        <p className="mt-5 mb-3 text-body-secondary">&copy; 2023–{new Date().getFullYear()}</p>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    </>
  )
}

export default Additm