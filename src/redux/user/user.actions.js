import UserActionTypes from './user.types'

export const googleSigninStart = () => ({
  type: UserActionTypes.GOOGLE_SIGNIN_START
})

export const emailSigninStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGNIN_START,
  payload: emailAndPassword
})

export const signinSuccess = user => ({
  type: UserActionTypes.SIGNIN_SUCCESS,
  payload: user
})

export const signinFailure = error => ({
  type: UserActionTypes.SIGNIN_FAILURE,
  payload: error
})

export const signoutStart = () => ({
  type: UserActionTypes.SIGNOUT_START
})

export const signoutSuccess = user => ({
  type: UserActionTypes.SIGNOUT_SUCCESS,
  payload: user
})

export const signoutFailure = error => ({
  type: UserActionTypes.SIGNOUT_FAILURE,
  payload: error
})

export const signupStart = userCredentials => ({
  type: UserActionTypes.SIGNUP_START,
  payload: userCredentials  // user, pass, displayname
})

export const signupSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGNUP_SUCCESS,
  payload: { user, additionalData}
})

export const signupFailure = error => ({
  type: UserActionTypes.SIGNUP_FAILURE,
  payload: error
})

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
})
