import React from 'react';
import { useEffect, useState, useRef } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuthStatus = () => {

    const [loggedIn, setLoggedIng] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const isMounted = useRef(true)

    useEffect(() => {

        if (isMounted) {
            const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setLoggedIng(true)
                }
                setCheckingStatus(false)
            })
        }
        return ()=>{
            isMounted.current = false
        }

        // eslint-disable-next-line
    }, [isMounted])
    return { loggedIn, checkingStatus }
}


// Protected routes in v6
// https://stackoverflow.com/questions/65505665/protected-route-with-firebase

// Fix memory leak warning
// https://stackoverflow.com/questions/59780268/cleanup-memory-leaks-on-an-unmounted-component-in-react-hooks