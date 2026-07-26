import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from './context/AuthContext.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import About from './pages/About.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Product from './pages/Product.jsx'
import NotFound from './pages/NotFound.jsx'

const App = () => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/register" replace />}
        />
        <Route
          path="/shop"
          element={isAuthenticated ? <Shop /> : <Navigate to="/register" replace />}
        />
        <Route
          path="/about"
          element={isAuthenticated ? <About /> : <Navigate to="/register" replace />}
        />
        <Route
          path="/cart"
          element={isAuthenticated ? <Cart /> : <Navigate to="/register" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/product/:id"
          element={isAuthenticated ? <Product /> : <Navigate to="/register" replace />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </>
  )
}

export default App
