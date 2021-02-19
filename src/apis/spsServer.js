/** @format */

import axios from 'axios'
import { backendConfig } from '../config/backend'

export const spsServerUrl = backendConfig.spsServerUrl

const instance = axios.create({
  baseURL: spsServerUrl
})

export const setAuthTokenV2 = (instance, token) => {
  if (token) {
    //apply to every request
    instance.defaults.headers.common['x-access-token'] = token
  } else {
    //Delete auth header
    delete instance.defaults.headers.common['x-access-token']
  }
}

export default instance
