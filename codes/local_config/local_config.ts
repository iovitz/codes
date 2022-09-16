import {readFileSync, writeFileSync} from 'fs'
import {FileOperation} from '../file_operation/file_operation'

interface Config {
  bitableSdk: string
  bearBitable: string
  bearWeb: string
}

class LocalConfigConstructor {
  _config: Partial<Config> = {}

  configFilePath: string = ''

  private inited: boolean = false

  get config (): Partial<Config> {
    return this._config
  }

  prepare (configFilePath: string) {
    if (this.inited) {
      throw new Error('LocalConfig has been inited!')
    }
    if (!FileOperation.pathExistsSync(configFilePath)) {
      FileOperation.ensureFileExists(configFilePath, Buffer.from(JSON.stringify({})))
    }
    this.configFilePath = configFilePath
    this.loadConfigFile()
    this.inited = true
  }

  update () {
    this.loadConfigFile()
  }


  modify (key: keyof Config, value: any) {
    this.config[key] = value
    this.save()
    this.update()
  }

  /**
   * 保存config内容到文件
   */
  save () {
    writeFileSync(this.configFilePath, JSON.stringify(this.config, null, 2))
  }

  private loadConfigFile () {
    const {_config} = this
    const configFileContent = readFileSync(this.configFilePath, 'utf8')

    try {
      this._config = JSON.parse(configFileContent)
    } catch (e) {
      writeFileSync(this.configFilePath, JSON.stringify(_config))
    }
  }
}

export const LocalConfig = new LocalConfigConstructor()
