import axios from 'axios'

const baseUrl = '/api'

export const register = (username, password) =>
  axios
    .post(`${baseUrl}/register`, { username, password })
    .then((response) => response.data)

export const login = (username, password) =>
  axios
    .post(`${baseUrl}/login`, { username, password })
    .then((response) => response.data)
