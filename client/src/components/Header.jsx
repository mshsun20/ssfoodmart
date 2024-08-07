import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { rmvUsr, dltAllUsr } from '../rtk/slices/UserSlice'

const Header = () => {
    const dispatch = useDispatch()
    const [usr, setUsr] = useState()

    const getSess = async () => {
        try {
            let Usrtokn = localStorage.getItem('User')
            let Usrdta = JSON.parse(Usrtokn)
            // console.log(Usrdta)
            if (Usrdta) {
                setUsr(Usrdta)
            }
            else {
                localStorage.removeItem('User')
                setUsr(null)
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
                dispatch(rmvUsr(usr._id))
                localStorage.removeItem('User')
                window.alert(`${usr.user_fname} successfully logged out.`)
                window.location.assign('/')
            }
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
        <div className="wbpg">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="#">Navbar</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-6">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink className="nav-link" to="/cartdet">Cart</NavLink>
                            </li> */}
                            {
                                (usr) ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/cartdet">Cart</NavLink>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {usr.user_fname}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li><NavLink className="dropdown-item" to="/user/profile">Profile</NavLink></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><NavLink className="dropdown-item" to="#" onClick={hndlgout}>Log Out</NavLink></li>
                                            </ul>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            User
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink className="dropdown-item" to="/login">Log In</NavLink></li>
                                            <li><NavLink className="dropdown-item" to="/register">Register</NavLink></li>
                                        </ul>
                                    </li>
                                )
                            }
                            <li className="nav-item">
                                <NavLink className="nav-link disabled" aria-disabled="true">Disabled</NavLink>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    </>
  )
}

export default Header