import { AbstractHandler } from './interface'

export class LowerCaseHandler extends AbstractHandler {
  public handle(request: string): string {
    request = request.toLowerCase()
    return super.handle(request)
  }
}
