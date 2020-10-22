/** @format */

import axios from 'axios'
import { backendConfig } from '../config/backend'

export const spsServerUrl = backendConfig.spsServerUrl

export default axios.create({
  baseURL: spsServerUrl
})
