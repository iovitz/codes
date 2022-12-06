// 利用缓存进行代理
const cache: Record<number, number> = {}

function fib (num: number): number {
  if (num <= 2) return 1
  if (cache[num]) return cache[num]
  cache[num] = fib(num - 1) + fib(num - 2)
  return cache[num]
}

console.log(fib(10))
