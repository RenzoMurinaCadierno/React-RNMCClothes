import { takeLatest, all, call, put } from 'redux-saga/effects'
import UserActionTypes from './user.types'
import { 
  auth, googleProvider, createUserProfileDocument, getCurrentUser 
} from '../../firebase/firebase.utils'
import { 
  signinSuccess, signinFailure, signoutSuccess,
  signoutFailure, signupSuccess, signupFailure 
} from './user.actions'

export function* getSnapshotFromUserAuth(userAuth, additionalData) {

  try {

    // create a new user document with the destructured user
    // it is the same as what we did before with async/await:
    //   > const userRef = await createUserProfileDocument(userAuth)
    // additionalData is for the displayName when signing up.
    //   > if it is undefined, nothing will be spread in, so it will 
    //     not conflict with google and email signin
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData)

    // now we need to get our user snapshot
    // the same as: userRef.onSnapshot( snapshot => ...)
    const userSnapshot = yield userRef.get()
  
    // and call for the action we typed before.
    // the same as doing setCurrentUser({ id: ss.id, ..snapshot.data()})
    yield put(signinSuccess({
      id: userSnapshot.id,
      ...userSnapshot.data()
    }))

  } catch(error) {

    // if any errors, yield the put of it
    yield put(signinFailure(error))
  }
}

export function* signInWithGoogle() {

  try {

    // we get a userRef back, destructure user object from it
    const { user } = yield auth.signInWithPopup(googleProvider)
    
    // get the snapshot and sign the user in
    yield getSnapshotFromUserAuth(user)

  } catch(error) {

    // if any errors, yield the put of it
    yield put(signinFailure(error))
  }
}

export function* signinWithEmail({ payload: { email, password } }) {
  
  try {

    // grab the user property in the object coming from firebase's
    // signInWithEmailAndPassword
    const { user } = yield auth.signInWithEmailAndPassword(email, password)
  
    // get the snapshot and sign the user in
    yield getSnapshotFromUserAuth(user)

  } catch (error) {
    yield put(signinFailure(error))
  }
}

export function* isUserAuthenticated() {

  try {

    // we get back the userAuth object from Firebase each time
    // the session changes
    const userAuth = yield getCurrentUser()

    // if there is no user session, nothing to do.
    if (!userAuth) return

    // if a user is logged in, get its snapshot and sign it in
    yield getSnapshotFromUserAuth(userAuth)
    
  } catch (error) {
    yield put(signinFailure(error))
  }
}

export function* signOut() {
  
  try {
    yield auth.signOut()
    yield put(signoutSuccess())

  } catch (error) {
    yield put(signoutFailure(error))
  }
}

// payload is userCredentials
export function* signUp({ payload: { email, password, displayName } }) {

  try {
    
    // get the user property from the user returned with firebase's
    // createUserWithEmailAndPassword method
    const { user } = yield auth.createUserWithEmailAndPassword(email, password)

    // call for signupSuccess passing that ser and displayName
    yield put(signupSuccess({ user, additionalData: { displayName } }))

  } catch (error) {

    yield put(signupFailure(error))
  }
}

// catch onSignupSuccess saga listener with the object containing
// the user and additionalData. Summon signIn
export function* signInAfterSignup({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData)
}

export function* onGoogleSinginStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signInWithGoogle)
}

export function* onEmailSignin() {
  yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, signinWithEmail)
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignoutStart() {
  yield takeLatest(UserActionTypes.SIGNOUT_START, signOut)
}

export function* onSignupStart() {
  yield takeLatest(UserActionTypes.SIGNUP_START, signUp)
}

export function* onSignupSuccess() {
  yield takeLatest(UserActionTypes.SIGNUP_SUCCESS, signInAfterSignup)
}

export function* userSagas() {
  yield(all([
    call(onGoogleSinginStart), 
    call(onEmailSignin),
    call(isUserAuthenticated),
    call(onSignoutStart),
    call(onSignupStart),
    call(onSignupSuccess),
  ]))
}