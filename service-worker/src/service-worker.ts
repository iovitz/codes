// https://panzhongxian.cn/cn/2021/04/08-service-workers-their-lifecycle-and-use-cases/

// 缓存名称
const CACHE_NAME = 'my-site-cache-v1';

// 需要缓存的资源列表
const URLS_TO_CACHE = [
  '/',
];

const swGlobal = self as any

// 安装事件
swGlobal.addEventListener('install', (event) => {
  console.log('###安装')
  swGlobal.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// 激活事件
swGlobal.addEventListener('activate', (event: any) => {
  console.log('###激活')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截网络请求并返回缓存的资源
swGlobal.addEventListener('fetch', (event: any) => {
  console.log('###Fetch', event)
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果缓存中有匹配的请求，返回缓存的资源
        if (response) {
          return response;
        }
        // 否则，发起网络请求
        return fetch(event.request).catch(() => {
          // 如果网络请求失败，返回离线页面
          return caches.match('/offline.html');
        });
      })
  );
});