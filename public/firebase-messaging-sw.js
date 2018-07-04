importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
const firebaseConfig = {
    apiKey: "AIzaSyA2kuyJIWakmM8x7S08ERWhj5O3WolPdGU",
    authDomain: "richbitch-4fc7a.firebaseapp.com",
    databaseURL: "https://richbitch-4fc7a.firebaseio.com",
    projectId: "richbitch-4fc7a",
    storageBucket: "richbitch-4fc7a.appspot.com",
    messagingSenderId: "964894129974"
};


firebase.initializeApp(firebaseConfig);;

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {

    const notificationTitle = payload.data.title;

    const notificationOptions = {
        body: payload.data.body,
        image: '/images/prestigeCard.png',
        icon: '/images/chrome-touch-icon-192x192.png',
        actions: [
            {action: 'buy', title: 'Get more'},
        ],
        vibrate: [200, 100, 200, 100, 200, 100, 200]
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);

});

self.addEventListener('notificationclick', function(event) {
    var messageId = event.notification.data;

    event.notification.close();

    if (event.action === 'buy') {
        // ToDo check routing for payment endpoint
        clients.openWindow("/payment");
    }
    else {
        clients.openWindow("/");
    }


}, false);