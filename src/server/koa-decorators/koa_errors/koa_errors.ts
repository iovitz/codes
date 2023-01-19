export enum ServerError {
  UnhandleException = 500
}

export enum ServerResponseCode {
  Success = 200,
  NotExist = 404,
  ServerError = 500,
  AthenticationError = 503
}

export abstract class ServerErrorBase extends Error {
  constructor (public code: ServerResponseCode, message: string) {
    super(message)
  }

  toJSON () {
    return {
      code: this.code,
      message: this.message,
    }
  }
}

export class UnhandleExceptionError extends ServerErrorBase {
  constructor (message: string) {
    super(ServerResponseCode.ServerError, message)
  }
}

export class AuthenticationError extends ServerErrorBase {
  constructor (message: string) {
    super(ServerResponseCode.AthenticationError, message)
  }
}
