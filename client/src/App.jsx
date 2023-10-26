import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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
import { AnimatePresence, motion } from 'framer-motion'
import Transition from './components/Transition'

const App = () => {
  // const location = useLocation()
  return (
    <BrowserRouter>
      <Header />
      <AnimatePresence>
        <Transition />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/about' element={<About />} />
          <Route path='/search' element={<Search />} />
          <Route path='/listing/:listingId' element={<Listing />} />
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/create-listing' element={<CreateListing />} />
            <Route path='/update-listing/:listingId' element={<UpdateListing />}/>
          </Route>

          <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
        </Routes>
      </AnimatePresence>
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