import axios from 'axios'

import { getValue } from './session'

const clientId = getValue('client_id')

const BASE_URL = `https://sqrmenu.sqrneo.com/api/shop/v2/slug/${clientId}/`

const axiosInstance = axios.create({ baseURL: BASE_URL })

export default axiosInstance
