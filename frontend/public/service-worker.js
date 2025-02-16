self.addEventListener('push', function(event) {
  const data = event.data.json();
  const title = data.title || 'Medication Alert';
  const options = {
    body: data.body || 'Check your medication supply.',
    icon: '/images/icon.png', // Optional: path to an icon
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
}); 

self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Close the notification
    event.waitUntil(
      clients.openWindow(event.notification.data.url) // Open the medication page
    );
  });
