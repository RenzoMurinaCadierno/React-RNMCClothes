import React from 'react'
import { 
  ErrorImageOverlay, ErrorImageContainer, ErrorImageText 
} from './error-boundary.styles'

class ErrorBoundary extends React.Component {

  constructor() {
    super()

    this.state = {
      hasErrored: false  // has the state errored?
    }
  }

  /**
   * Static class method that catches any error that triggers
   * on its children, ahead of time.
   * @param {*} error : The error thrown by any of its children
   */
  static getDerivedStateFromError(error) {

    // process the error (we do not do so here), and return an
    // object representing that a children has thrown an error
    return { hasErrored: true }
  }

  /**
   * Life cycle that triggers when an error is caught, after
   * the static method above. Normally to log the error
   * @param {*} error : the error object cought.
   * @param {*} info : info on the component that threw it.
   */
  componentDidCatch(error, info) {

    console.log(error)
  }

  render() {

    // on error, return this
    if (this.state.hasErrored) {

      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl='https://i.imgur.com/hkRuanu.png'/>
          <ErrorImageText> 
            This page is a lie... Try coming back later to see if the case was solved. 
          </ErrorImageText>
        </ErrorImageOverlay>
      )
    }

    // otherwise, no error, return all wrapped up children
    return this.props.children
  }
}

export default ErrorBoundary