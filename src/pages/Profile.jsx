import React from 'react'
import { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth';
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';
import ListingItem from '../component/ListingItem'

//  ../ = uper folder



import { useNavigate, Link } from 'react-router-dom';
import { list } from 'firebase/storage';
import { async } from '@firebase/util';
// getting the user info from the Firestore 


function Profile() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [listing, setListing] = useState(null)

  // making the changeable btn to edit the profile details
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData;
  const navigate = useNavigate()
  const onLogout = () => {
    auth.signOut()
    navigate('/')

  }
  // adding the useEffect value
//   useEffect(() => {
//     const fetchUserListings = async () => {

//       const listingsRef = collection(db, 'listings')
//       const q = query(
//         listingsRef,
//         where('userRef', '==', auth.currentUser.uid),
//         orderBy('timestamp', 'desc')
//       )

//       const querySnap = await getDocs(q)
//       let listing = []
//       querySnap.forEach((doc) => {
//         return listing.push({
//           id: doc.id,
//           data: doc.data(),
//         })
//       })
//       // console.log(listing);
//       setListing(listing)
//       setLoading(false)



//     }
// // eslint-disable-next-line
//     fetchUserListings()
//   }, [auth.currentUser.uid])
useEffect(() => {
  const fetchUserListings = async () => {
    const listingsRef = collection(db, "listings");

    const q = query(
      listingsRef,
      where("useRef", "==", auth.currentUser.uid),
      orderBy("timestamp", "desc")
    );

    const querySnap = await getDocs(q);
    const listings = querySnap.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    setListing(listings);
    setLoading(false);
  };

  fetchUserListings();
}, [auth.currentUser.uid]);




  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))

  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name is fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        // updated in firestore
        const userRef = doc(db,
          'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })




      }
    } catch (error) {
      console.log(error);
      toast.error('could not update profile details')
    }
  }

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete')) {
      await deleteDoc(doc(db, 'listings', listingId))

      const updatedListings = listing.filter((listing) => listing.id !== listingId)
      setListing(updatedListings)
      toast.success('Successfully deleted listing')
    }
  }
  const onEdit =(listingId)=> navigate(`/edit-listing/${listingId}`)


  return (
    <>

      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">My Profile</p>
          <button className="logOut" type='button' onClick={onLogout}>Logout</button>
        </header>
        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Details</p>
            {/* to edit the form details */}
            <p className="changePersonalDetails"

              onClick={() => {

                changeDetails && onSubmit()
                // click again put changeState to false and onSubmit will hit .
                setChangeDetails((prevState) => !prevState)
              }}
            >
              {/* when click set to true */}
              {changeDetails ? "done" : "change "}
            </p>
          </div>
          <div className="profileCard">
            <form >

              <input type="text" id='name' className={!changeDetails ? 'profileName' : 'profileNameActive'}
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
              <input type="text" id='email' className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
              />
            </form>
          </div>

          {/* adding the listing item editing tool over here */}
          <Link to='/create-listing' className='createListing'>
            <img src={homeIcon} alt="home" />

            <p>Sale or rent your home</p>
            <img src={arrowRight} alt="arrow" />
          </Link>

          {!loading && listing && listing?.length > 0 && (
            <>
              <p className="listingText">Your Listings</p>
              <ul className="listingsList">
                {listing.map((listing) => (

                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                    onDelete={() => onDelete(listing.id)}
                    onEdit={() => onEdit(listing.id)}
                  />


                ))}
              </ul>
            </>
          )}


        </main>
      </div>
    </>
  )
}



export default Profile