
export function getCode (length: number) {
  return Math.random()
      .toString(
          // 10个数字+26个字母
          36,
      )
      .substring(
          // 从第三位开始，第一位容易重复
          3, 3 + length,
      )
}
