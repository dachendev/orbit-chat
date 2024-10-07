const authUserReducer = (state, action) => {
  if (action.type === 'set') {
    const authUser = action.payload
    localStorage.setItem('authUser', JSON.stringify(authUser))
    return authUser
  }

  if (action.type === 'remove') {
    localStorage.removeItem('authUser')
    return null
  }

  return state
}

export default authUserReducer
