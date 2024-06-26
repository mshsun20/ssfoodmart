import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    let name, value

  return (
    <>
        <div className="wbpg">
            <footer className="d-flex flex-wrap justify-content-between align-items-center px-5 py-3 my-4 border-top fs-6">
                <p className="col-md-4 mb-0 text-body-secondary">&copy; 2024 Company, Inc</p>

                <NavLink to="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <svg className="bi me-2" width="40" height="32"></svg>
                </NavLink>

                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item"><NavLink to="#" className="nav-link px-2 text-body-secondary">Home</NavLink></li>
                    <li className="nav-item"><NavLink to="#" className="nav-link px-2 text-body-secondary">Features</NavLink></li>
                    <li className="nav-item"><NavLink to="#" className="nav-link px-2 text-body-secondary">Pricing</NavLink></li>
                    <li className="nav-item"><NavLink to="#" className="nav-link px-2 text-body-secondary">FAQs</NavLink></li>
                    <li className="nav-item"><NavLink to="#" className="nav-link px-2 text-body-secondary">About</NavLink></li>
                </ul>
            </footer>
        </div>
    </>
  )
}

export default Footer