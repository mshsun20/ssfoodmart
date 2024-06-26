import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Items from '../pages/items/Items'
import Additm from '../pages/items/Additm'
import Itmdtl from '../pages/items/Itmdtl'
import Addimg from '../pages/items/Addimg'
import Edtitm from '../pages/items/Edtitm'
import Carts from '../pages/carts/Carts'
import Edtcrt from '../pages/carts/Edtcrt'
import Edtcrtitm from '../pages/carts/Edtcrtitm'
import Users from '../pages/users/Users'

const Router = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/admin/login' element={<Login />} />
            <Route path='/admin/register' element={<Register />} />
            <Route path='/admin/items/all' element={<Items />} />
            <Route path='/admin/items/add' element={<Additm />} />
            <Route path='/admin/items/details/:id' element={<Itmdtl />} />
            <Route path='/admin/items/image/add/:id' element={<Addimg />} />
            <Route path='/admin/items/edit/:id' element={<Edtitm />} />
            <Route path='/admin/carts/all' element={<Carts />} />
            <Route path='/admin/carts/edit/:id' element={<Edtcrt />} />
            <Route path='/admin/cartitms/edit/:id' element={<Edtcrtitm />} />
            <Route path='/admin/users/all' element={<Users />} />
        </Routes>
    </>
  )
}

export default Router