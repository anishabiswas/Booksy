importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDnGPTKQ533tCdrRMONsBKHxuG8bd3IEwM",
  authDomain: "booksy-e61b6.firebaseapp.com",
  projectId: "booksy-e61b6",
  storageBucket: "booksy-e61b6.firebasestorage.app",
  messagingSenderId: "174567715488",
  appId: "1:174567715488:web:8a9e889cfa60679dac4fc5",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
