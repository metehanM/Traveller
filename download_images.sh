#!/bin/bash

# Create assets directory if it doesn't exist
mkdir -p assets

# Download car images
curl -o assets/car1.jpg "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop"
curl -o assets/car2.jpg "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop"
curl -o assets/car3.jpg "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop"

# Download app store images
curl -o assets/app-store.png "https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
curl -o assets/play-store.png "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"

# Download app preview image
curl -o assets/app-preview.png "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop"

echo "Images downloaded successfully!" 