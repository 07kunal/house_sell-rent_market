// fetching the data from the firebase and applying here

import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../firebase.config'
import { toast } from 'react-toastify';
import Spinner from '../component/Spinner';
import ListingItem from '../component/ListingItem';


function Offers() {

  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams();
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get reference
        const listingsRef = collection(db, 'listings')

        // get a query
        const q = query(listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(2)


        )

        //Executive query
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)

        let listings = []
        querySnap.forEach((doc) => {
          // console.log(doc.data());
          // doc.data() is method to get the data 
          return listings.push({
            // providing the data as personal id 
            id: doc.id,
            data: doc.data()
          })
        })

        setListings(listings)
        setLoading(false)

      } catch (error) {
        toast.error('Could not fetch listings')

      }
    }
    fetchListings()
    // eslint-disable-next-line 
  }, [])

  // Pagination / Load more

  const onFetchMoreListings = async () => {
    try {
      // get reference
      const listingsRef = collection(db, 'listings')

      // get a query
      const q = query(listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10),
        // and this limit will add the next 10 listing in the next slot


      )

      //Executive query
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)


      let listings = []
      querySnap.forEach((doc) => {
        // console.log(doc.data());
        // doc.data() is method to get the data 
        return listings.push({
          // providing the data as personal id 
          id: doc.id,
          data: doc.data()
        })
      })
      // const listings = querySnap.map((doc)=>({
      //     id:doc.id,
      //     data:doc.data(),
      // }))

      setListings((prevSate) => [...prevSate, ...listings])
      setLoading(false)

    } catch (error) {
      toast.error('Could not fetch listings')

    }
  }
  // pagination load more is end here

  // above part me se hmne data ko push or pull kiya from the backend and now 
  return (
    <div className='category'>
      <header>
        <p className="pageHeader">
          Offers
        </p>
      </header>
      {/* checking the loading state under the header */}
      {loading ? <Spinner /> : listings && listings.length > 0 ?

        <>
          <main>
            {/* actual data to store in the main page */}
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />

              ))}
            </ul>
          </main>
          <br />
          <br />
          {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings}>Load More</p>
          )}

        </>
        : <p>There are not Current Offers</p>}



    </div>
  )
}

export default Offers