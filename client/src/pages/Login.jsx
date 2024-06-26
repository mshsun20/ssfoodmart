import { useState } from 'react'
import axios from 'axios'
import Server from '../Server'
import { useDispatch } from 'react-redux'
import { addUsr } from '../rtk/slices/UserSlice'

const Login = () => {
    const dispatch = useDispatch()
    const [vl, setVl] = useState()
    let name, value

    const hndlinp = (e) => {
        name = e.target.name
        value = e.target.value
        setVl({...vl, [name]:value})
    }

    const hndlsub = async (e) => {
        e.preventDefault()
        const {user_acc, user_pass} = vl

        try {
            const res = await axios.post(`${Server}/user/login`, {user_acc, user_pass})
            const dta = await res.data
            // console.log(dta.data)
            if (dta.statuscode === 220) {
                window.alert(dta.success)
                localStorage.setItem('User', JSON.stringify(dta.data))
                dispatch(addUsr(dta.data))
                window.location.assign('/')
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
                <div className="hdrh3 mb-3 fw-normal">Please Log In</div>
                <div className="frmsec">
                    <main className="form-signin w-100 m-auto">
                        <form className='frm'>
                            <div className="form-floating">
                                <input type="email" className="form-control" name='user_acc' id="floatingInput" placeholder="name@example.com" onChange={hndlinp} />
                                <label htmlFor="floatingInput">Account Id</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" name='user_pass' id="floatingPassword" placeholder="Password" onChange={hndlinp} />
                                <label htmlFor="floatingPassword">Password</label>
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