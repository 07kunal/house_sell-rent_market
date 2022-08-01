import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Spinner from './Spinner';
// import { async } from '@firebase/util';

function HomeSlider() {
    const [loading, setLoading] = useState(true)
    // const [listing, setListing] = useState({})
    const [listing, setListing] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchListings = async () => {
            const listingRef = collection(db, 'listings')
            const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5))

            const querySnap = await getDocs(q)
            let listing = []
            querySnap.forEach((doc) => {
                return listing.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            // console.log(listing);
            setListing(listing)
            setLoading(false)
        }

        fetchListings()

    }, [])
    if (loading) {
        return <Spinner />
    }
    if (listing && listing.length === 0) {
        return <></>
    }
    return (
        listing && (
            <>
                <p className="exploreHeading">Recomended</p>
                <Swiper slidesPerView={1} pagination={{ clickable: true }}
                    // adding height id needed
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    navigation
                    autoplay
                    style={{ height: "350px" }}
                >
                    {listing.map(({ data, id }) => (
                        <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                            <div style={{
                                background: `url(${data.imgUrls[0]}) center no-repeat`,
                                backgroundSize: 'cover'
                            }} className="swiperSlideDiv"

                            >
                                <p className="swiperSlideText">{data.name}</p>
                                <p className="swiperSlidePrice">
                                    ${data.discountedPrice ?? data.regularPrice}
                                    {''} {data.type === 'rent' && '/ month'}
                                </p>
                            </div>


                        </SwiperSlide>
                    ))}


                </Swiper>
            </>
        )
    )
}

export default HomeSlider