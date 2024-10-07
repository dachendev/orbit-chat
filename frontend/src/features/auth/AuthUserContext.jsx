import PropTypes from 'prop-types'
import { createContext, useContext, useReducer } from 'react'
import authUserReducer from './authUserReducer'

const AuthUserContext = createContext()

export const AuthUserContextProvider = ({ children }) => {
  const storedAuthUser = localStorage.getItem('authUser')
  const [authUser, authUserDispatch] = useReducer(
    authUserReducer,
    JSON.parse(storedAuthUser)
  )

  return (
    <AuthUserContext.Provider value={[authUser, authUserDispatch]}>
      {children}
    </AuthUserContext.Provider>
  )
}

AuthUserContextProvider.propTypes = {
  children: PropTypes.node,
}

export const useAuthUserContext = () => useContext(AuthUserContext)

export default AuthUserContext
