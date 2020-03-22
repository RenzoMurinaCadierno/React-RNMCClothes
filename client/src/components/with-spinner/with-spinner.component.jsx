import React from 'react'
import Spinner from '../spinner/spinner.component'

// WithSpinner is a HOC: a function that takes a component to wrap
// applies some logic to it, and returs that same component with that
// logic (that is why we have 2 => )
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps}) => {

  return isLoading ? <Spinner /> : <WrappedComponent { ...otherProps } />
}

export default WithSpinner


// OR THE LONG VERSION ( EXPLAINS DOUBLE =>)
//
// const WithSpinner = WrappedComponent => {
// 
//   const Spinner = ({ isLoading, ...otherProps}) => {
//
//     return isLoading ? (
//
//       <Spinner />
//    
//     ) : (
//      
//       // not loading: pass all props to the wrapped component
//       <WrappedComponent { ...otherProps } />
//     )
//   }
//
//   // return either the <Spinner> or the <WrappedComponent> with its
//   // props, depending on if it is rendering or not
//   return Spinner 
// }
//
// export default WithSpinner