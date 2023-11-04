import { CommandManager } from './command_manager'
import { CommandName } from './commands'

const commandManager = new CommandManager()

commandManager.execute(CommandName.Copy, 'text')
commandManager.execute(CommandName.Paste, 'text')
