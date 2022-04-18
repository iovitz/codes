import apiFunctionFactory from '../ajax'
import API_MAP from './api-config'

export const userLogin = apiFunctionFactory(API_MAP.user.login)
