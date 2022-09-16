import {mkdirSync, writeFileSync} from 'fs'
import {sep} from 'path'
export class FileOperation {
  private constructor () {}
  /**
   * 确保文件夹一定存在
   * @param {string} dirpath The path of the directory
   */
  static ensurePathExists = (dirpath: string) => {
    mkdirSync(dirpath, {recursive: true})
  }
  /**
   * 确保文件内容一定存在
   * @param {string} filepath The path of the file
   * @param {Buffer} content Content of the file
   */
  static ensureFileExists = (filepath: string, content: Buffer) => {
    const dirpath = filepath.slice(0, filepath.lastIndexOf(sep))
    this.ensurePathExists(dirpath)
    writeFileSync(filepath, content)
  }

  static pathExistsSync (path: string) {
    return true
  }
}
