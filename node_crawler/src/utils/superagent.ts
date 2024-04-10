import superagent from 'superagent'
import superagentCharset from 'superagent-charset'
import { load, CheerioAPI } from 'cheerio'

superagentCharset(superagent)

export function fetchHTMLPage(url: string, isGBK = false) {
  return new Promise<CheerioAPI>((resolve, reject) => {
    let request = superagent.get(url)
    if (isGBK) {
      // @ts-ignore
      request.charset('gbk')

      request.end((err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(load(res.text))
        }
      })
    }
  })
}
