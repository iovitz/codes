import envMode from './envMode'

const API_TIMEOUT = 5000

const apiConfig = {
  development: {
    API_BASE_URL: '/api',
    API_TIMEOUT
  },
  production: {
    API_BASE_URL: '/api',
    API_TIMEOUT
  }
}

export default apiConfig[envMode]
