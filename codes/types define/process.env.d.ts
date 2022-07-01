// node环境下定义process.env
declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined
    port: string
  }
}
