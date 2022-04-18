import { createApiItem } from '../../ajax'

const user = {
  login: createApiItem<{uname: string, upass: string}, {token: string, avatar: string}>('get', '/login')
}

export default user
