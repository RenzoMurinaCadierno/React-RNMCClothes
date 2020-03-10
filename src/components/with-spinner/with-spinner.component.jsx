import React from 'react'
import { SpinnerContainer, SpinnerOverlay} from './with-spinner.styles'

// WithSpinner is a HOC: a function that takes a component to wrap
// applies some logic to it, and returs that same component with that
// logic (that is why we have 2 => )
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps}) => {
  
  return isLoading ? (

    <SpinnerOverlay>       {/* makes sure spinner is centered*/}
      <SpinnerContainer /> {/* the actual spinner styled comp*/}
    </SpinnerOverlay>
  
  ) : (
    
    // not loading: pass all props to the wrapped component
    <WrappedComponent { ...otherProps } />
  )
}

export default WithSpinner