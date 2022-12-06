export class DBStorage {
  private indexedDB = window.indexedDB
  private IDBTransaction = window.IDBTransaction

  constructor () {
  }

  private prepare () {
    const request = indexedDB.open('myDatabase', 1)

    request.addEventListener('success', (e) => {
      console.log('连接数据库成功')
    })

    request.addEventListener('error', (e) => {
      console.log('连接数据库失败')
    })
  }

  public set (key: string, val: any) {}

  public get (key: string) {}

  public delete (dbName: string) {}

  public drop (dbName: string) {}

  public clear (dbName: string) {}
}
