import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyCFz9QBuZjHMrGkwiWaPOqRoz4H_esPB08",
  authDomain: "rnmc-clothes.firebaseapp.com",
  databaseURL: "https://rnmc-clothes.firebaseio.com",
  projectId: "rnmc-clothes",
  storageBucket: "rnmc-clothes.appspot.com",
  messagingSenderId: "1016116059704",
  appId: "1:1016116059704:web:20d39e644981be4c5e90cd"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

// bring google authentication up
const provider = new firebase.auth.GoogleAuthProvider()

// always bring the prompt window to select an account
// when user tries to sign in or up with google
provider.setCustomParameters({ prompt: 'select_account' })

// export that functionality, which links to a popup
export const signInWithGoogle = () => auth.signInWithPopup(provider)

// export firebase as default in case we need to use any of
// the other methods outside of it
export default firebase