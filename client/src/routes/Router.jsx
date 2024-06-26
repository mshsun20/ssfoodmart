import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Items from '../pages/items/Items'
import Itemdtl from '../pages/items/Itemdtl'
import Cartdet from '../pages/carts/Cartdet'
import Updtitm from '../pages/items/Updtitm'
import Successpg from '../pages/carts/Successpg'
import Cancelpg from '../pages/carts/Cancelpg'

const Router = () => {
  return (
    <>
        <Header />
        <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Items />} />
            <Route path='/itemdet/:itmnm' element={<Itemdtl />} />
            <Route path='/cartdet' element={<Cartdet />} />
            <Route path='/edtdet/:itmnm' element={<Updtitm />} />
            <Route path='/success' element={<Successpg />} />
            <Route path='/cancel' element={<Cancelpg />} />
        </Routes>
        <Footer />
    </>
  )
}

export default Router