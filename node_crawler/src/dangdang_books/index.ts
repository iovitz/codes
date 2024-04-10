import { fetchHTMLPage } from '../utils/superagent'

async function bootstrap() {
  const startPageSelector = await fetchHTMLPage('http://bang.dangdang.com/books/bestsellers/01.41.00.00.00.00-year-2023-0-1-1', true)

  console.log(startPageSelector(''))
}

bootstrap()
