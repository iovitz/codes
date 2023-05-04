import {createHmac} from 'crypto'
export function getCode (length: number) {
  return Math.random()
      .toString(
      // 10个数字+26个字母
          36,
      )
      .substring(
      // 从第三位开始，第一位容易重复
          3,
          3 + length,
      )
}

export function cryptoPassword (password: string, salt = 'salt') {
  const hash = createHmac('sha512', salt) /** 使用sha512算法进行hash*/
  hash.update(password)
  const value = hash.digest('hex')
  return {
    salt: salt,
    passwordHash: value,
  }
}
