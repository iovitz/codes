import { copyCommand } from './copy.command'
import { pasteCommand } from './paste.command'

export enum CommandName {
  Copy = 'Copy',
  Paste = 'Paste',
}
export const commandMap: Record<CommandName, (...args: any[]) => boolean> = {
  [CommandName.Copy]: copyCommand,
  [CommandName.Paste]: pasteCommand,
}
