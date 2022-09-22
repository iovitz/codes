import threePartColors from 'colors'
import Table from 'cli-table3'

// Change the prefix.
export enum LogLevel {
  Normal = 'Normal',
  Debug = 'Debug',
}

class Printer {
  private level: LogLevel = LogLevel.Normal

  setLevel (level: LogLevel) {
    this.level = level
  }
  transformParam (params: any[]) {
    return params.map((param) => typeof(param) === 'object' && param !== null ? JSON.stringify(param, null, 2) : param)
  }
  success (...args: any[]) {
    console.log('SUC', ...this.transformParam(args))
  }
  error (...args: any[]) {
    console.log('ERR', ...this.transformParam(args))
  }
  info (...args: any[]) {
    console.log('INF', ...this.transformParam(args))
  }
  table (head: string[], rows: any[]) {
    const table = new Table({
      head,
    })
    if (Array.isArray(rows[0])) {
      table.push(...rows)
    } else {
      table.push(rows)
    }
    console.log(table.toString())
  }
  custom (prefix: string, ...args: any[]) {
    console.log(prefix, ...this.transformParam(args))
  }
  verbose (...args: any[]) {
    if (this.level !== LogLevel.Debug) return
    console.log('DEB', ...this.transformParam(args))
  }
}

export const printer = new Printer()
export const colors = threePartColors
