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
import Locations from '../pages/masters/locations/Locations'
import Countrys from '../pages/masters/locations/countrys/Countrys'
import Addcntrys from '../pages/masters/locations/countrys/Addcntrys'
import States from '../pages/masters/locations/states/States'
import Addstts from '../pages/masters/locations/states/Addsttts'
import Districts from '../pages/masters/locations/districts/Districts'
import Adddstrcts from '../pages/masters/locations/districts/Adddstrcts'
import Categorys from '../pages/masters/categorys/Categorys'
import Addcategs from '../pages/masters/categorys/Addcategs'

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
            <Route path='/admin/masters/loc' element={<Locations />} />
            <Route path='/admin/masters/loc/country' element={<Countrys />} />
            <Route path='/admin/masters/loc/country/add' element={<Addcntrys />} />
            <Route path='/admin/masters/loc/state' element={<States />} />
            <Route path='/admin/masters/loc/state/add' element={<Addstts />} />
            <Route path='/admin/masters/loc/district' element={<Districts />} />
            <Route path='/admin/masters/loc/district/add' element={<Adddstrcts />} />
            <Route path='/admin/masters/category' element={<Categorys />} />
            <Route path='/admin/masters/category/add' element={<Addcategs />} />
        </Routes>
    </>
  )
}

export default Router