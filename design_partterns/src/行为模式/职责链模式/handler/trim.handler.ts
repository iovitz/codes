import { AbstractHandler } from './interface'

export class TrimHandler extends AbstractHandler {
  public handle(request: string): string {
    request = request.trim()
    return super.handle(request)
  }
}
