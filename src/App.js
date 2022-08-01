
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// toastify container for popup msg
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./component/Navbar";
import PrivateRoute from "./component/PrivateRoute";
import Explore from './pages/Explore'
import Offers from './pages/Offers';

import Category from "./pages/Category";
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp';
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import ForgotPassword from './pages/ForgotPassword';
import Contact from "./pages/Contact";
import EditListing from "./pages/EditListing";



function App() {
  return (
    // fragment as parents element 1st router 2nd navbar
    <>
      {/* adding routes here */}
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          {/* making profile a special protection */}
          <Route path='/category/:categoryName' element={<Category />} />

          <Route path='/profile' element={<PrivateRoute />}>
            {/* that basically the outlet  */}
            <Route path='/profile' element={<Profile />} />

          </Route>
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/edit-listing/:listingId' element={<EditListing />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/category/:categoryName/:listingId' element={<Listing />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/contact/:landlordId' element={<Contact />} />



        </Routes>


        {/* navbar */}
        <Navbar />
      </Router>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
