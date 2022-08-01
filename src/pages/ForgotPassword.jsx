import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast, Toast } from 'react-toastify';

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';



function ForgotPassword() {

  const [email, setEmail] = useState('')
  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      // getting the required data from this
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email Was Sent')

    } catch (error) {
      toast.error('unable to send reset email');
      console.log(error);
    }
  }
  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Forget Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input type="email" className="emailInput" placeholder='Email' id='email'
            value={email}
            onChange={onChange}
          />
          <Link className='forgotPasswordLink' to='/sign-in'>
            Sign In
          </Link>
          <div className="signInBar">
            <div className="signInText">Send Reset Links</div>
            <button className="signInButton">
              <ArrowRightIcon fill='#fff' width='34px' height='34px' />
            </button>
          </div>


        </form>
      </main>

    </div>
  )
}

export default ForgotPassword  