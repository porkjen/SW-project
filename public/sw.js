const SW = '[Service Worker]';

self.addEventListener('install', function(event){
    console.log('[SW] 安裝(Install) Service Worker!',event);
});

self.addEventListener('activate', function(event){
    console.log('[SW] 觸發(Activate) Service Worker!',event);
    return self.clients.claim();
});

self.addEventListener('push', event => {
  console.log(`${SW} Push Received.`);
  console.log(`${SW} Push had this data: ${event.data.text()}`);
  const title = '海大機車共乘網';
  const options = {
    body: '有人向您發出新的共乘請求'
    // icon: '',
    // badge: ''
  };
  setTimeout(() => {
    event.waitUntil(self.registration.showNotification(title, options));
  }, 5000);
});

self.addEventListener('notificationclick', event => {
    console.log(`${SW} Notification click Received.`);
    event.notification.close();
    event.waitUntil(
     clients.openWindow("../mainPage.html")
    );
  });