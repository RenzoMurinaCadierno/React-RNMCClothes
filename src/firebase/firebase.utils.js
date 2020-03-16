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

export const createUserProfileDocument = async (userAuthObj, additionalDataObj) => {
  
  // if there is no user object (not logged in), nothing to do
  if (!userAuthObj) return

  // get the user reference object with its UID stored inside 
  // the user object. The reference is the path to that user
  // object and the UID. It is NOT the snapshot! The snapshot
  // is the actual data that user document holds.
  const userRef = firestore.doc(`users/${ userAuthObj.uid }`)

  // once we got the reference to that document, get its snapshot.
  // The reference contains info on how to access it, the snapshot
  // has all the docs/collections it stores
  const snapshot = await userRef.get()

  // if the snapshot does not exist, the user does not either.
  // we need to create it
  if (!snapshot.exists) {

    // from the big user object returned, get the displayName and email
    const { displayName, email } = userAuthObj

    // store the user creation date 
    const createdAt = new Date()

    // use all of that data to create the user snapshot, and set
    // it to its respective user reference (which holds the path)
    // to it.
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalDataObj
      })
    } catch (err) {
      console.log('error creating user', err)
    }
  }

  // whether it exists or not, always return the user reference
  return userRef
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

  // get the target collection reference using its key
  const collectionRef = firestore.collection(collectionKey)

  // create a batch object for the batch call
  const batch = firestore.batch()

  // loop over the objectsToAdd (array), to add it to the batch
  objectsToAdd.forEach( obj => {

    // ask Firebase to give you a new empty docRef with a unique key.
    // This action will create 5 documents, one for each shop item
    // (hats, sneakers, jackets, men, women), each one empty with an id.
    const newDocRef = collectionRef.doc()

    // set each item object to this empty doc, in the batch
    batch.set(newDocRef, obj)
  })

  // fire off the request. It returns a Promise with either a void
  // (null) value in success. We can chain with .then each time we
  // want to send requests for it, or handle errors
  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = collections => {

  // get the array of QuerySnapshots from onSnapshot() in
  // shop.component, and pap them one by one
  const transformedCollections = collections.docs.map( doc => {

    // for each of those returned documents, use data() to convert
    // them to JS objects, and desctructure the title and items
    const { title, items } = doc.data()

    // create and return the final shop collection object to render
    // in our frontend
    return {

      // encodeURI is a method that comes with every JS renderer.
      // It converts any non-readable characters coming from the 
      // URI into a version the browser can read
      routeName: encodeURI(title.toLowerCase()),

      // the ID will be the one in firebase's snapShot
      id: doc.id,

      // title and items are as we destructured them
      title,
      items
    }
  })

  // reduce the generated array to an object whose keys are the
  // collection names and values, the collection object. Exactly
  // like what we had in the big object of collection items:
  // { hats: { hats collection }, jackets: { jackets collection }, ... }
  // Make sure to return the accumulator to enter in the next 
  // iteration, and to return this newly generated object.
  return transformedCollections.reduce( (accumulator, collection) => {
    
    accumulator[collection.title.toLowerCase()] = collection
    
    return accumulator
  
  }, {} )   // start from an empty object
}

// we need to mimic the functionality of firebase to listen to
// user Auth changes, so we add it here. It is Promise based
// because Sagas work that way with yield
export const getCurrentUser = () => {

  return new Promise( (resolve, reject ) => {

    // listen to changes and as soon as you get one, unsubscribe
    const unsubscribe = auth.onAuthStateChanged( userAuth => {
      unsubscribe()
      resolve(userAuth)

    }, reject)
  })
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

// bring google authentication up
export const googleProvider = new firebase.auth.GoogleAuthProvider()

// always bring the prompt window to select an account
// when user tries to sign in or up with google
googleProvider.setCustomParameters({ prompt: 'select_account' })

// export that functionality, which links to a popup
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

// export firebase as default in case we need to use any of
// the other methods outside of it
export default firebase