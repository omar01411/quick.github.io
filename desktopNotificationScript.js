function showNotification(title, message, targetUrl) {
    if (!("Notification" in window)) {
        console.log("This browser does not support notifications");
        return;
    }

    Notification.requestPermission().then(function(permission) {
        if (permission === "granted") {
            var notification = new Notification(title, {
                body: message,
                requireInteraction: true,
                 icon: 'assets/images/icon.png',
                 tag: 'unique-notification-tag',

                 // Keep notification until user interacts
                //icon: '/your-icon-path.png'  // Optional
            });

            notification.onclick = function() {
                // Close the notification
                console.log("Notification clicked");
                notification.close();

                // If a specific URL is provided, use it
                console.log("Target URL:", targetUrl);
                const url = targetUrl || window.location.href;

                // Handle different window states
                console.log("Window state:", window.parent);
                if (window.parent) {
                    // Try to focus parent window if in iframe
                    window.parent.focus();
                }

                // Focus existing tab if it exists
                console.log("Existing tab:", window.open('', '_blank'));
                const existingTab = window.open('', '_blank');
                if (existingTab) {
                    existingTab.focus();
                } else {
                    // Open new window/tab if needed
                    console.log("New tab:", window.open(url, '_blank'));
                    const newTab = window.open(url, '_blank');
                    if (newTab) {
                        newTab.focus();
                    }
                }

                // Focus main window
                console.log("Main window:", window);
                window.focus();

                // Call back to Dart if needed
                if (typeof window.myFunc === 'function') {
                    window.myFunc();
                }
            };

            // Handle notification errors
            notification.onerror = function(error) {
                console.error("Notification error:", error);
            };
        }
    }).catch(function(error) {
        console.error("Permission request error:", error);
    });
}

//function showNotification(title, message) {
//    if (!("Notification" in window)) {
//        console.log("This browser does not support notifications");
//        return;
//    }
//
//    Notification.requestPermission().then(function(permission) {
//        if (permission === "granted") {
//            var notification = new Notification(title, {
//                body: message,
////                icon: '/your-icon-path.png'  // Optional
//            });
//
//            notification.onclick = function() {
//                window.focus();
//                notification.close();
//                // Call back to Dart if needed
//                if (typeof window.myFunc === 'function') {
//                    window.myFunc();
//                }
//            };
//        }
//    });
//}