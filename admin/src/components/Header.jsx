import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { rmvUsr, dltAllUsr } from '../rtk/slices/UserSlice'

const Header = () => {
    const dispatch = useDispatch()
    const [acc, setAcc] = useState()
    const navig = useNavigate()

    const getSess = async () => {
        try {
            let Acctokn = localStorage.getItem('Account')
            let Accdta = JSON.parse(Acctokn)
            // console.log(Accdta)
            if (Accdta) {
                setAcc(Accdta)
            }
            else {
                localStorage.removeItem('Account')
                setAcc(null)
                navig('/admin/login')
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getSess()
    }, [])

    const hndlgout = async () => {
        try {
            if (window.confirm(`Confirm Logout ?`)) {
                dispatch(rmvUsr(acc._id))
                localStorage.removeItem('Account')
                window.alert(`${acc.acc_fname} successfully logged out.`)
                navig('/admin/login')
            }
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
        <div className="wbpg">
            <nav className="navbar navbar-expand-lg bg-body-tertiary px-5">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="#">Navbar</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-end">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <ul className="navbar-nav ms-5 mb-2 mb-lg-0 fs-6">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Items
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="/admin/items/all">All Items</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/admin/items/add">Add New Items</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Carts
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="/admin/carts/all">All Carts</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/admin/carts/invoice">All Invoices</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Users
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="/admin/users/all">All Users</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/admin/users/add">Add New Users</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/admin/users/privelege">Set Privileges</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Master Setups
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="/admin/masters/category">Category Master</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/admin/masters/loc">Location Master</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {acc&&acc.acc_fname}
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="#">Profile</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/admin/register">Add Account</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={hndlgout}>Logout</button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </>
  )
}

export default Header