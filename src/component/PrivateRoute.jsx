import React from 'react';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from './Spinner';

const PrivateRoute = () => {
    //taking out loggedIn, checkingStatus from useAuthStatus
    const { loggedIn, checkingStatus } = useAuthStatus()

    if (checkingStatus) {
        return <Spinner />
    }
    return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
    // outlet 
}

export default PrivateRoute 