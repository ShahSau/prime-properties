import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Listing from "./pages/Listing"
import Profile from "./pages/Profile"
import Search from "./pages/Search"
import SignIn from "./pages/Signin"
import SignUp from "./pages/SignUp"
import UpdateListing from "./pages/UpdateListing"
import CreateListing from "./pages/CreateListing"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/create-listing' element={<CreateListing />} />
        <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App