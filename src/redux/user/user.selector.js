import { createSelector } from 'reselect'

const selectUser = state => state.user

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
)

/**
 * Selector example with more than one state:
 * 
 * const selectUser = state = state.user
 * const selectCart = state = state.cart
 * 
 * export const selectCurrentUser = createSelector(
 * [selectUser, selectCart],
 * (user, cart) => user.currentUser
 * )
 */
