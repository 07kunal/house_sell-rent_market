import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// import SwiperCore, { Navigation, pagination, Scrollbar, Ally } from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y ,Autoplay} from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config'
import Spinner from '../component/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import { list } from 'firebase/storage';




function Listing() {

    const [listing, setListing] = useState({})
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()



    // to fetch the listing use the hook of name useEffect
    useEffect(() => {

        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setListing(docSnap.data());
                // console.log(docSnap.data());
                setLoading(false)
            }

        }


        fetchListing();
    }, [navigate, params.listingId])

    // adding spinner always here
    if (loading) {
        <Spinner />
    }
    return (
        <main>
            {/* slider */}
            
                <Swiper 
                modules={[Navigation,Pagination,Scrollbar,A11y,Autoplay]}

                slidesPerView={1} pagination={{ clickable: true }}
                navigation
                autoplay
                style={{height:'500px'}}
                >

                    {listing.imgUrls && (listing.imgUrls.map((url, index) => (
                        <SwiperSlide key={index}>
                            <div
                                style={{
                                    background: `url(${listing.imgUrls[index]}) center no-repeat`,
                                    backgroundSize: 'cover'

                                }}
                                className="swiperSlideDiv">

                            </div>
                        </SwiperSlide>
                    )))}

                </Swiper>
            





            <div
                className='shareIconDiv'
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    setShareLinkCopied(true)
                    setTimeout(() => {
                        setShareLinkCopied(false)
                    }, 2000)
                }}
            >
                <img src={shareIcon} alt='' />
            </div>

            {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

            <div className='listingDetails'>
                <p className='listingName'>
                    {listing.name} - $
                    {listing.offer && (listing.offer
                        ? listing.discountedPrice.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ',')
                        : listing.regularPrice.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ','))}


                </p>
                <p className='listingLocation'>{listing.location}</p>
                <p className='listingType'>
                    For {listing.type === 'rent' ? 'Rent' : 'Sale'}
                </p>
                {listing.offer && (
                    <p className='discountPrice'>
                        ${listing.offer && (listing.regularPrice - listing.discountedPrice)} discount
                    </p>
                )}

                <ul className='listingDetailsList'>
                    <li>
                        {listing.bedrooms > 1
                            ? `${listing.bedrooms} Bedrooms`
                            : '1 Bedroom'}
                    </li>
                    <li>
                        {listing.bathrooms > 1
                            ? `${listing.bathrooms} Bathrooms`
                            : '1 Bathroom'}
                    </li>
                    <li>{listing.parking && 'Parking Spot'}</li>
                    <li>{listing.furnished && 'Furnished'}</li>
                </ul>


                {/* <p className="listingLocationTitle">Location</p> */}
                {/* Map */}

                {/* <div className="leafletContainer">
                    <MapContainer style={{ height: '100%', width: '100%' }}
                        center={(listing.geolocation && [listing.geolocation.lat, listing.geolocation.lng])}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
                        />
                        <Marker
                            position={(listing.geolocation && [listing.geolocation.lat, listing.geolocation.lng])}
                        >
                            <Popup>
                                {listing.location}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div> */}

                {/* map end */}

                {/* condition statement */}
                {auth.currentUser?.uid !== listing.userRef && (
                    <Link to={`/contact/${listing.useRef}?listingName=${listing.name}`} className='primaryButton'>
                        Contact Landlord
                    </Link>
                )}


            </div>



        </main>
    )
}

export default Listing

