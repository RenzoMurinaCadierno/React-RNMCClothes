import React, { useState } from 'react'
import { connect } from 'react-redux'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { googleSigninStart, emailSigninStart } from '../../redux/user/user.actions'
import './signin.styles.scss'

const SignIn = ({ emailSigninStart, googleSigninStart }) => {

  const [userCredentials, setUserCredentials] = useState({ 
    email: '', password: '' 
  })

  const { email, password } = userCredentials

  const handleSubmit = async e => {

    e.preventDefault()

    emailSigninStart(email, password)
  }

  const handleChange = e => {

    const { value, name } = e.target

    setUserCredentials({ ...userCredentials, [name]: value })
  }

  return (
    <div className='sign-in'>
      <h2> I already have an account </h2>
      <span> Sign in with email and password </span>

    <form onSubmit={ handleSubmit }>
      <FormInput 
        name='email' 
        type='email' 
        value={ email } 
        handleChange={ handleChange }
        label='email'
        required />

      <FormInput 
        name='password' 
        type='password' 
        value={ password }
        handleChange={ handleChange }
        label='password'
        required />

      <div className="buttons">
        <CustomButton type='submit'> 
          Sign in 
        </CustomButton>
        <CustomButton
          type='button'  // setting this avoids triggering form submit
          onClick={ googleSigninStart } 
          isGoogleSignIn
        > 
          Sign in with Google
        </CustomButton>
      </div>
    </form>
  </div>
  )
}


const mapDispatchToProps = dispatch => ({
  googleSigninStart: () => 
    dispatch(googleSigninStart()),
  emailSigninStart: (email, password) => 
    dispatch(emailSigninStart({ email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn)