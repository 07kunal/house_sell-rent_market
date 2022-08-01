import React from 'react';
import { useState } from 'react';
// import toast to display the error msg
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
// from the firebase 
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import OAuth from '../component/OAuth';


function SignIn() {

  // to showpassword 
  const [showpassword, setShowPassword] = useState(false);
  // insteed of making different state for the form input field .. make formData having the object of these input field

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // to destructure it, to use different places as 

  const { email, password } = formData;
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
  // onsubmit provider

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (userCredential.user) {
        navigate('/')
      }

    } catch (error) {
      toast.error('Wrong Credentials')
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

        <form onSubmit={onSubmit}>
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
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            {/* adding icon over here */}
            <button className="signInButton">
              <ArrowRightIcon fill='#fff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        <OAuth />
        <Link to='/sign-up' className='registerLink'>
          Sign Up Instead
        </Link>
      </div>
    </>
  )
}

export default SignIn