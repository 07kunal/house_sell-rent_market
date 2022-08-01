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


function Category() {

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
                    where('type', '==', params.categoryName),
                    orderBy('timestamp', 'desc'),
                    limit(10)
                    // this limit will shows the listing 


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

                setListings(listings)
                setLoading(false)

            } catch (error) {
                toast.error('Could not fetch listings')

            }
        }
        fetchListings()
        // eslint-disable-next-line 
    }, [params.categoryName])

    // Pagination / Load more

    const onFetchMoreListings = async () => {
        try {
            // get reference
            const listingsRef = collection(db, 'listings')

            // get a query
            const q = query(listingsRef,
                where('type', '==', params.categoryName),
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


    // onFetchMoreListings()
    // eslint-disable-next-line 



    // above part me se hmne data ko push or pull kiya from the backend and now 
    return (
        <div className='category'>
            <header>
                <p className="pageHeader">
                    {params.categoryName === "rent" ? 'Places for Rent' : 'Places for sale'}
                </p>
            </header>
            {/* checking the loading state under the header */}
            {loading ? <Spinner /> : listings && listings.length > 0 ?
                <>
                    {/* actual data to store in the main page */}
                    <main>
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
                : <p>No listings for {params.categoryName}</p>}



        </div>
    )
}

export default Category