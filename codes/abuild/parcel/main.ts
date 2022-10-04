const request = indexedDB.open('test', 3)

let db: IDBDatabase
request.addEventListener('success', (e) => {
  db = (e.target as any).result
})

request.addEventListener('upgradeneeded', (e) => {
  const db = (e.target as any).result
  console.log('upgradeneeded', db)
  db.createObjectStore('users', {
    keyPath: 'id',
  })
})
const users = [
  {
    id: 101, name: 'zs',
  },
  {
    id: 102, name: 'ls',
  },
  {
    id: 103, name: 'ww',
  },
]

for (let i = 0; i < 4; i++) {
  const button = document.createElement('button')
  button.innerText = `button-${i}`
  document.body.appendChild(button)
  button.onclick = () => {
    const transaction = db.transaction('users', 'readwrite')
    console.log(transaction)
    const store = transaction.objectStore('users')
    switch (i) {
      case 0:
        for (const user of users) {
          const request = store.add(user)
        }
        transaction.oncomplete = function () {
          console.log('添加操作完成')
        }
        transaction.onerror = function (e) {
          console.log(e)
        }
        break
      case 1:
        console.log('删')
        break
      case 2:
        console.log('改')
        break
      case 3:
        // eslint-disable-next-line no-case-declarations
        const request = store.get(102)
        request.onsuccess = function (e) {
          console.log((e.target as any).result)
        }
        console.log('查')
        break
      default:
        break
    }
  }
}
