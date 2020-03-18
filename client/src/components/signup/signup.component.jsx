import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signupStart } from '../../redux/user/user.actions'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import './signup.styles.scss'

const SignUp = ({ signupStart }) => {

  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { displayName, email, password, confirmPassword } = userCredentials 

  const handleSubmit = async e => {

    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match.')
      return
    }

    signupStart({ displayName, email, password })
  }
  
  const handleChange = e => {

    const { name, value } = e.target

    setUserCredentials({ ...userCredentials, [name]: value })
  }

    
  return (
    <div className='signup'>
      <h2 className="title"> I do not have an account</h2>
      <span> Signup with email and password </span>
      <form className="signup-form" onSubmit={ handleSubmit }>
        <FormInput
          type='text'
          name='displayName'
          value={ displayName }
          onChange={ handleChange }
          label='Username'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={ email }
          onChange={ handleChange }
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={ password }
          onChange={ handleChange }
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={ confirmPassword }
          onChange={ handleChange }
          label='Confirm password'
          required
        />

        <CustomButton type='submit'> SIGN UP </CustomButton>

      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  signupStart: userCredentials => dispatch(signupStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp)
