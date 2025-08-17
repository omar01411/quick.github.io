// notification_service.js
// Add this file to your web/assets folder

function requestNotificationPermission() {
    return Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
            return true;
        }
        return false;
    });
}

function showNotification(title, body, icon) {
    if (!("Notification" in window)) {
        console.log("This browser does not support notifications");
        return;
    }

    if (Notification.permission === "granted") {
        const notification = new Notification(title, {
            body: body,
            icon: icon || 'assets/images/icon.png',
        });

        notification.onclick = function(event) {

            event.preventDefault();
            window.focus();
            notification.close();
        };
    }
}

// Register this function globally so Flutter can access it
window.showNotification = showNotification;
window.requestNotificationPermission = requestNotificationPermission;