
export function getCode (length: number) {
  return Math.random()
      .toString(
          // 10个数字+26个字母
          36,
      )
      .substring(2, 2 + length)
}
