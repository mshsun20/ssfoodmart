import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Server from '../Server'

const Register = () => {
    const [vl, setVl] = useState({user_name:'', user_email:'', user_pass:'', user_phn:'', user_fname:'', user_cntry:'', user_state:'', user_dist:'', user_cty:'', user_addr:'', user_pinc:''})
    let name, value
    const navig = useNavigate()

    const hndlinp = (e) => {
        name = e.target.name
        value = e.target.value
        setVl({...vl, [name]:value})
    }

    const hndlsub = async (e) => {
        e.preventDefault()
        const {user_name, user_email, user_pass, user_phn, user_fname, user_cntry, user_state, user_dist, user_cty, user_addr, user_pinc} = vl

        try {
            if (!user_name || !user_email || !user_pass || !user_fname || !user_cntry || !user_addr) {
                window.alert(`Please fill all Mandatory fields ...!!`)
            }
            else {
                const res = await axios.post(`${Server}/user/add`, {user_name, user_email, user_pass, user_phn, user_fname, user_cntry, user_state, user_dist, user_cty, user_addr, user_pinc})
                const dta = await res.data
                if (dta.statuscode === 220) {
                    window.alert(dta.success)
                    navig('/login')
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
                <div className="hdrh3 mb-3 fw-normal">Please Register</div>
                <div className="frmsec">
                    <main className="form-signin w-100 m-auto">
                        <form className='frm'>
                            <div className="form-floating">
                                <input type="text" className="form-control" name='user_name' id="floatingInput" placeholder="nameexample" onChange={hndlinp} />
                                <label htmlFor="floatingInput">Username</label>
                            </div>
                            <div className="form-floating">
                                <input type="email" className="form-control" name='user_email' id="floatingInput" placeholder="name@example.com" onChange={hndlinp} />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" name='user_pass' id="floatingPassword" placeholder="Password" onChange={hndlinp} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" name='user_phn' id="floatingInput" placeholder="nameexample" onChange={hndlinp} />
                                <label htmlFor="floatingInput">Phone</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" name='user_fname' id="floatingInput" placeholder="name example" onChange={hndlinp} />
                                <label htmlFor="floatingInput">Full Name</label>
                            </div>
                            <div className="form-floating">
                                <select className='form-control' name='user_cntry' id="" onChange={hndlinp}>
                                    <option value="0">----Country----</option>
                                    <option value="India">India</option>
                                </select>
                            </div>
                            <div className="form-floating">
                                <select className='form-control' name='user_state' id="" onChange={hndlinp}>
                                    <option value="0">----State----</option>
                                    <option value="West Bengal">West Bengal</option>
                                </select>
                            </div>
                            <div className="form-floating">
                                <select className='form-control' name='user_dist' id="" onChange={hndlinp}>
                                    <option value="0">----District----</option>
                                    <option value="Kolkata">Kolkata</option>
                                </select>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" name='user_cty' id="floatingInput" placeholder="nameexample" onChange={hndlinp} />
                                <label htmlFor="floatingInput">City</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" name='user_addr' id="floatingInput" placeholder="nameexample" onChange={hndlinp} />
                                <label htmlFor="floatingInput">Address</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" name='user_pinc' id="floatingInput" placeholder="nameexample" onChange={hndlinp} />
                                <label htmlFor="floatingInput">Pin Code</label>
                            </div>

                            <div className="form-check text-start my-3">
                                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Remember me
                                </label>
                            </div>
                            <button className="btn btn-primary w-100 py-2" type="submit" onClick={hndlsub}>Sign Up</button>
                            <p className="mt-5 mb-3 text-body-secondary">&copy; 2023–{new Date().getFullYear()}</p>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register