import firebase from 'firebase/app'
import 'firebase/firestore'

const firestore = firebase.firestore()  // summon the DB

// QUERY method 1: one by one up to the desired coll/doc

firestore
  .collection('users')          // get 'users' collection
  .doc('cEr9xdJ6JOBFCIemipgs')  // get this specific user doc
  .collection('cartItems')      // get its cartItems collection
  .doc('N5QF9lgVUwTU2Yvfzgpi')  // get this specific item doc

// QUERY method 2: chain the path to get to the doc/coll

firestore
  .doc('/users/cEr9xdJ6JOBFCIemipgs/cartItems/N5QF9lgVUwTU2Yvfzgpi')

firestore
  .collection('/users/cEr9xdJ6JOBFCIemipgs/cartItems')