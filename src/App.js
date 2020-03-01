import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import './App.css'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SigninAndSignup from './pages/signin-and-signup/signin-and-signup.component'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuthObj => {

      // if signing out, it will be null. If it is signing in, it will be an obj
      if (userAuthObj) {

        // we get a user reference from onAuthStateChanged
        const userRef = await createUserProfileDocument(userAuthObj)

        // createUserProfileDocument() returns a user obj stapshot at the time of calling
        // a new user obj if registering, a user obj on login
        // onSnapshot() also subscribes to changes on the user
        // object, so any changes on it will modify the state
        userRef.onSnapshot(snapshot => {

          // set currentUser as its snapshot.id and snapshot.data()
          // which holds name and email
          this.setState(
            {
              currentUser: {
                id: snapshot.id,
                ...snapshot.data()
              }
            }
            ,
            // setstate is async, to check it after a change,
            // remember to pass a callback to it!
            () => console.log(this.state)
          )
        })
      
      } else {

        // nothing came up from onAuthStateChange (null user),
        // so state should be null
        this.setState({ currentUser: userAuthObj })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={ this.state.currentUser } />
        <Switch>
          <Route exact path='/' component={ HomePage } />
          <Route path='/shop' component={ ShopPage } />
          <Route path='/signin' component={ SigninAndSignup } />
        </Switch>
      </div>
    )
  }
}

export default App
