import axios, { getToken } from './axios'

// remove the token and user from the session storage
export const removeToken = () => {
  if (getToken()) {
    sessionStorage.removeItem('token')
    window.location.href = '/login'
  }
}

// set the token and user from the session storage
export const setToken = (token, user = {}) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  sessionStorage.setItem('token', token)
}
