// Add this to your index.html in the <head> section

function checkNotification() {
    // First check if notifications are supported
    if (!("Notification" in window)) {
        alert("Desktop notifications are not supported by this browser.");
        return;
    }

    // Handle different permission states
    if (Notification.permission === "granted") {
        return true;
    } else if (Notification.permission !== 'denied') {
        // Use Promise-based syntax for better compatibility
        return Notification.requestPermission()
            .then(function(permission) {
                return permission === "granted";
            })
            .catch(function(error) {
                console.error("Error requesting notification permission:", error);
                return false;
            });
    }
    return false;
}

 function handleNotificationClick(event) {
        // If in iframe, focus the top-most parent
        if (isInIframe) {
            try {
                // Focus the topmost parent window
                window.top.focus();
            } catch (e) {
                // If we can't access the top window due to same-origin policy
                window.parent.focus();
            }
        } else {
            window.focus();
        }

        // Close the notification
        event.target.close();

        // Call your custom function if needed
        if (typeof myFunc === 'function') {
            myFunc();
        }
    }

function showNotification(title, body) {
    // Check if we're in an iframe
    const isInIframe = window !== window.parent;

    // Function to handle notification click
    // Create and show notification
    try {
        const notification = new Notification(title, {
            icon: 'assets/images/icon.png',
            body: body,
            tag: 'unique-notification-tag', // Prevent duplicate notifications
            requireInteraction: true // Keep notification until user interacts
        });

        // Add click handler
        notification.onclick = handleNotificationClick;

        // Optional: Auto-close after 5 seconds
        setTimeout(() => notification.close(), 5000);

        return notification;
    } catch (error) {
        console.error("Error showing notification:", error);
        return null;
    }
}

// Function to initialize notifications
function initializeNotifications() {
    // Request permission immediately if we're running in release mode
    if (window.location.hostname !== 'localhost') {
        checkNotification();
    }
}

// Initialize when page loads
window.addEventListener('load', initializeNotifications);

// Expose functions to Flutter
window.showWebNotification = function(title, body) {
    checkNotification().then(function(granted) {
        if (granted) {
            showNotification(title, body);
        }
    });
};
