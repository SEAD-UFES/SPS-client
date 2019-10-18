import axios from 'axios'

export const spsServerUrl = 'http://localhost:3000'

export default axios.create({
  baseURL: spsServerUrl
})
