self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  
  const title = '海大機車共乘網';
  const options = {
    body: '已接受您的共乘請求'
    // icon: '',
    // badge: ''
  };

  event.waitUntil(self.registration.showNotification(title, options));
});  

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('./mainPage.html')
  );
});