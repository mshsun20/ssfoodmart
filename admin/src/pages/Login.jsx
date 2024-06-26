import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Server from '../Server'
import { useDispatch } from 'react-redux'
import { addUsr } from '../rtk/slices/UserSlice'

const Login = () => {
    const dispatch = useDispatch()
    const [vl, setVl] = useState({acc_id:'', acc_pass:''})
    let name, value
    const navig = useNavigate()

    const hndlinp = (e) => {
        name = e.target.name
        value = e.target.value
        setVl({...vl, [name]:value})
    }

    const hndlsub = async (e) => {
        e.preventDefault()
        const {acc_id, acc_pass} = vl

        try {
            if (!acc_id || !acc_pass) {
                window.alert(`Please fill all Mandatory fields ...!!`)
            }
            else {
                const res = await axios.post(`${Server}/account/login`, {acc_id, acc_pass})
                const dta = await res.data
                // console.log(dta.data)
                if (dta.statuscode === 220) {
                    window.alert(dta.success)
                    localStorage.setItem('Account', JSON.stringify(dta.data))
                    dispatch(addUsr(dta.data))
                    navig('/')
                }
                else {
                    window.alert(dta.error)
                    setVl({acc_id:'', acc_pass:''})
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
                <div className="hdrh3 mb-3 fw-normal">Please Log In</div>
                <div className="frmsec">
                    <main className="form-signin w-100 m-auto">
                        <form className='frm'>
                            <div className="form-floating">
                                <input type="email" className="form-control" name='acc_id' id="floatingInput" placeholder="name@example.com" value={vl.acc_id} onChange={hndlinp} />
                                <label htmlFor="floatingInput">Account Id *</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" name='acc_pass' id="floatingPassword" placeholder="Password" value={vl.acc_pass} onChange={hndlinp} />
                                <label htmlFor="floatingPassword">Password *</label>
                            </div>

                            <div className="form-check text-start my-3">
                                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Remember me
                                </label>
                            </div>
                            <button className="btn btn-primary w-100 py-2" type="submit" onClick={hndlsub}>Sign In</button>
                            <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login