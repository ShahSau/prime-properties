import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Listing from './pages/Listing'
import Profile from './pages/Profile'
import Search from './pages/Search'
import SignIn from './pages/Signin'
import SignUp from './pages/SignUp'
import UpdateListing from './pages/UpdateListing'
import CreateListing from './pages/CreateListing'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import { Suspense } from 'react'
import AnimatedRoutes from './AnimatedRoutes'


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}


export default function WrappedApp() {
  return (
    <Suspense fallback="...loading">
      <App />
    </Suspense>
  )
}