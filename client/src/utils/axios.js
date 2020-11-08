import axios from 'axios'

const instance = axios.create({
  headers: {
    'Content-type': 'application/json'
  }
})

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null
}

const token = getToken()

if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default instance
