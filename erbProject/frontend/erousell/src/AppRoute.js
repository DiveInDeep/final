import React from 'react';
import Home from './pages/home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sell from './pages/sell';
import Profile from './pages/profile';
import UserSetting from './pages/userSetting'
import ForgetPassword from './pages/forgetPassword';
import Product from './pages/product';
import Category from './pages/category';
import { useSelector, useDispatch } from 'react-redux';
import Test from './pages/Test';


const ProtectedRoute = ({children}) => {
  const auth = useSelector((state) => state.app.auth);
  let a = false;

  if (a) {
    console.log("hi")
    return <Navigate to="/" replace />;
  }

  return children;
};


function AppRoute (props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sell' element={<Sell/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/setting' element={<UserSetting />}/>
        <Route path='/forgot-password' element={<ForgetPassword />}/>
        <Route path='/product' element={<Product />}/>
        <Route path='/category' element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        }/>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoute;

