import { CommandName, commandMap } from './commands'

export class CommandManager {
  execute(commandName: CommandName, content: string) {
    const commandFn = commandMap[commandName]
    return commandFn(content)
  }
}
