import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Server from '../Server'

const Register = () => {
    const [vl, setVl] = useState({acc_name:'', acc_email:'', acc_pass:'', acc_phn:'', acc_fname:'', acc_cntry:'', acc_state:'', acc_dist:'', acc_cty:'', acc_addr:'', acc_pinc:'', acc_type:'', acc_adhar:'', acc_pan:'', acc_gendr:'', acc_comp:'', acc_dept:'', acc_desig:'', acc_role:'', acc_ctc:''})
    let name, value
    const navig = useNavigate()

    const hndlinp = (e) => {
        name = e.target.name
        value = e.target.value
        setVl({...vl, [name]:value})
    }

    const hndlsub = async (e) => {
        e.preventDefault()
        const {acc_name, acc_email, acc_pass, acc_phn, acc_fname, acc_cntry, acc_state, acc_dist, acc_cty, acc_addr, acc_pinc, acc_type, acc_adhar, acc_pan, acc_gendr, acc_comp, acc_dept, acc_desig, acc_role, acc_ctc} = vl

        try {
            if (!acc_name || !acc_email || !acc_pass || !acc_phn || !acc_fname || !acc_cntry || !acc_state || !acc_pinc || !acc_type) {
                window.alert(`Please fill all Mandatory fields ...!!`)
            }
            else {
                const res = await axios.post(`${Server}/account/add`, {acc_name, acc_email, acc_pass, acc_phn, acc_fname, acc_cntry, acc_state, acc_dist, acc_cty, acc_addr, acc_pinc, acc_type, acc_adhar, acc_pan, acc_gendr, acc_comp, acc_dept, acc_desig, acc_role, acc_ctc})
                const dta = await res.data
                if (dta.statuscode === 220) {
                    window.alert(dta.success)
                    navig('/admin/login')
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
                                <input type="text" className="form-control" name='acc_name' id="floatingInput" placeholder="nameexample" onChange={hndlinp} required />
                                <label htmlFor="floatingInput">Username *</label>
                            </div>
                            <div className="form-floating">
                                <input type="email" className="form-control" name='acc_email' id="floatingInput" placeholder="name@example.com" onChange={hndlinp} required />
                                <label htmlFor="floatingInput">Email Id *</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" name='acc_pass' id="floatingPassword" placeholder="Password" onChange={hndlinp} required />
                                <label htmlFor="floatingPassword">Password *</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" name='acc_phn' id="floatingInput" placeholder="nameexample" onChange={hndlinp} required />
                                <label htmlFor="floatingInput">Phone *</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" name='acc_fname' id="floatingInput" placeholder="name example" onChange={hndlinp} required />
                                <label htmlFor="floatingInput">Full Name *</label>
                            </div>
                            <div className="form-floating">
                                <select className='form-control' name='acc_cntry' id="" onChange={hndlinp} required>
                                    <option value="0">----Country *----</option>
                                    <option value="India">India</option>
                                </select>
                            </div>
                            <div className="form-floating">
                                <select className='form-control' name='acc_state' id="" onChange={hndlinp} required>
                                    <option value="0">----State *----</option>
                                    <option value="West Bengal">West Bengal</option>
                                </select>
                            </div>
                            <div className="form-floating">
                                <select className='form-control' name='acc_dist' id="" onChange={hndlinp}>
                                    <option value="0">----District----</option>
                                    <option value="Kolkata">Kolkata</option>
                                    <option value="South 24 Parganas">South 24 Parganas</option>
                                    <option value="North 24 Parganas">North 24 Parganas</option>
                                </select>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" name='acc_cty' id="floatingInput" placeholder="nameexample" onChange={hndlinp} />
                                <label htmlFor="floatingInput">City</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" name='acc_addr' id="floatingInput" placeholder="nameexample" onChange={hndlinp} />
                                <label htmlFor="floatingInput">Address</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" name='acc_pinc' id="floatingInput" placeholder="nameexample" onChange={hndlinp} required />
                                <label htmlFor="floatingInput">Pin Code *</label>
                            </div>
                            <div className="form-floating">
                                <select className='form-control' name='acc_type' id="" onChange={hndlinp} required>
                                    <option value="0">----Type *----</option>
                                    <option value="Developer">Developer</option>
                                    <option value="Super Admin">Super Admin</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" name='acc_adhar' id="floatingInput" placeholder="nameexample" onChange={hndlinp} required />
                                <label htmlFor="floatingInput">Aadhar No. *</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" name='acc_pan' id="floatingInput" placeholder="nameexample" onChange={hndlinp} required />
                                <label htmlFor="floatingInput">PAN No. *</label>
                            </div>
                            <div className="form-floating">
                                <select className='form-control' name='acc_gendr' id="" onChange={hndlinp} required>
                                    <option value="0">----Gender----</option>
                                    <option value="India">Male</option>
                                    <option value="India">Female</option>
                                    <option value="India">Others</option>
                                </select>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" name='acc_comp' id="floatingInput" placeholder="nameexample" onChange={hndlinp} required />
                                <label htmlFor="floatingInput">Company</label>
                            </div>
                            <div className="form-floating">
                                <select className='form-control' name='acc_dept' id="" onChange={hndlinp} required>
                                    <option value="0">----Department----</option>
                                    <option value="India">IT</option>
                                    <option value="Branding">Branding</option>
                                    <option value="CRM">CRM</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Sales & Marketing">Sales & Marketing</option>
                                    <option value="Management">Management</option>
                                </select>
                            </div>
                            <div className="form-floating">
                                <select className='form-control' name='acc_desig' id="" onChange={hndlinp} required>
                                    <option value="0">----Designation----</option>
                                    <option value="President">President</option>
                                    <option value="CEO">CEO</option>
                                    <option value="Vice">Vice President</option>
                                    <option value="Country Head">Country Head</option>
                                    <option value="Zonal Head">Zonal Head</option>
                                    <option value="State Head">State Head</option>
                                    <option value="Region Head">Region Head</option>
                                    <option value="District Head">District Head</option>
                                    <option value="Organisation Head">Organisation Head</option>
                                    <option value="Division Head">Division Head</option>
                                    <option value="Department Head">Department Head</option>
                                    <option value="General Manager">General Manager</option>
                                </select>
                            </div>
                            <div className="form-floating">
                                <select className='form-control' name='acc_role' id="" onChange={hndlinp} required>
                                    <option value="0">----Job Roles----</option>
                                    <option value="India"></option>
                                </select>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" name='acc_ctc' id="floatingInput" placeholder="nameexample" onChange={hndlinp} required />
                                <label htmlFor="floatingInput">Current CTC</label>
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