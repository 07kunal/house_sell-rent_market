import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// to importing svg from the assets folder 

import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg';
import { ReactComponent as ExpoloreIcon } from '../assets/svg/exploreIcon.svg';
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg';



function Navbar() {
    // using this we can achor tag
    const navigate = useNavigate();
    const location = useLocation();


    // matching the path to understand the color 

    const pathMatchRoute = (route) => {
        if (route === location.pathname) {
            return true
        }
    }



    return (
        <footer className='navbar'>
            <nav className="navbarNav">
                <ul className="navbarListItems">
                    <li className="navbarListItem" onClick={() => navigate('/')}>
                        {/* making fill as conditional as  */}
                        <ExpoloreIcon fill={pathMatchRoute("/") ? "#2c2c2c" : "#8f8f8f"} width='36px' height='36px' />
                        <span className={
                            pathMatchRoute('/') ? "navbarListItemNameActive" : "navbarListItemName"
                        }>Explore</span>
                    </li>
                    <li className="navbarListItem" onClick={() => navigate('/offers')}>
                        <OfferIcon fill={pathMatchRoute("/offers") ? "#2c2c2c" : "#8f8f8f"} width='36px' height='36px' />
                        <span className={
                            pathMatchRoute('/offers') ? "navbarListItemNameActive" : "navbarListItemName"
                        }>Offers</span>
                    </li>
                    <li className="navbarListItem" onClick={() => navigate('/profile')}>
                        <PersonOutlineIcon fill={pathMatchRoute("/profile") ? "#2c2c2c" : "#8f8f8f"} width='36px' height='36px' />
                        <span className={
                            pathMatchRoute('/profile') ? "navbarListItemNameActive" : "navbarListItemName"
                        }>Profile</span>
                    </li>
                </ul>
            </nav>


        </footer>
    )
}

export default Navbar