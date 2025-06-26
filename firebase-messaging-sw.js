importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBK_iI-ejmWsk2y_tBufCwAI9oJBWwzZRY",
  authDomain: "taskmatepro-85f50.firebaseapp.com",
  projectId: "taskmatepro-85f50",
  messagingSenderId: "634112080614",
  appId: "G-8JW5YS4B91"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
