import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import toast to display the error msg
import { toast } from 'react-toastify';
// fiebase authentication
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import OAuth from '../component/OAuth';

import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

import { db } from '../firebase.config'


import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';



function SignUp() {

  // to showpassword 
  const [showpassword, setShowPassword] = useState(false);
  // insteed of making different state for the form input field .. make formData having the object of these input field

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  // to destructure it, to use different places as 

  const { name, email, password } = formData;
  // to navigate 
  const navigate = useNavigate();

  const onChange = (e) => {
    // to fill-up the formData as 
    setFormData((prevState) => ({
      ...prevState,
      // email:e.target.value, old way to doing that 
      [e.target.id]: e.target.value
      // by doing above this we can hit both email or password
    }))
  }


  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user;
      // console.log(user);

      updateProfile(auth.currentUser, {
        displayName: name
      })
      // for storing the data to firestore 
      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp();

      // setDoc updated the data to database
      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error('somthing went wrong with registration')
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">
            Welcome Back!
          </p>
        </header>

        <form onSubmit={onSubmit} >
          <input type="text" className="nameInput"
            placeholder='Name'
            id='name'
            value={name}
            // making the onchange function as 
            onChange={onChange}

          />

          <input type="email" className="emailInput"
            placeholder='Email'
            id='email'
            value={email}
            // making the onchange function as 
            onChange={onChange}

          />
          <div className="passwordInputDiv">
            <input
              // here type me showpassword ko condition me rkha he so that if showpassword ko click kre or password visible ho 
              type={showpassword ? 'text' : 'password'} className="passwordInput"
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />

            {/* button/img to show password */}
            <img src={visibilityIcon} alt="show password"
              className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          {/* forgot password */}
          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>
          {/* sign in button */}
          <div className="signUpBar">
            <p className="signUpText">Sign UP</p>
            {/* adding icon over here */}
            <button className="signUpButton" >
              <ArrowRightIcon fill='#fff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        <OAuth />

        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  )
}

export default SignUp