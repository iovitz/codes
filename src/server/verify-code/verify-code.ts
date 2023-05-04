import {createHmac} from 'crypto'
import {createHash} from 'crypto'
import {sign, verify} from 'jsonwebtoken'

export function getRandomCode (length: number) {
  return Math.random()
      .toString(
      // 10个数字+26个字母
          36,
      )
      .substring(
          3,
          3 + length,
      )
}


const SALT = 'SALT'
const TOKEN_KEY = 'TOKEN_KEY'

export function passwordWithSalt (password: string) {
  const saltPassword = createHash('md5')
      .update(SALT + password)
      .digest('hex')
  return saltPassword
}

export function createToken<T extends {}> (data: T) {
  const token = sign(data, TOKEN_KEY)
  return token
}

// 解析jwt
export function verifyToken (url: string, token?: string) {
  if (!token) {
    throw new Error('Token Miss')
  }
  try {
    // 这里判断是否需要split
    return verify(token.split(' ')[1], TOKEN_KEY)
  } catch (e) {
    throw new Error('Invalid Token')
  }
}
