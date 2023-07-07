// script.js
const buttons = document.querySelectorAll('.video-btn');
const overlay = document.getElementById('video-overlay');
const menuButton = document.getElementById('menu-button');
const closeButton = document.getElementById('close-button');
const menuOverlay = document.getElementById('menu-overlay');
const menuItems = document.querySelectorAll('.menu-item');

// Function to adjust video size
function adjustVideoSize() {
    let video = overlay.querySelector('video');
    if (video) {
        let aspectRatio = video.videoWidth / video.videoHeight;
        let newWidth = window.innerHeight * aspectRatio;
        video.style.width = newWidth + 'px';
        video.style.height = '100%';
    }
}

// Listen for resize events
window.addEventListener('resize', adjustVideoSize);

function playVideoFromSource(videoSrc) {
    // Create new video element
    let video = document.createElement('video');
    video.className = 'video-js vjs-default-skin';
    video.controls = false;
    video.autoplay = true;

    // Check if the device is iOS Safari
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
        // Open video in fullscreen on iOS Safari
        video.setAttribute('webkit-playsinline', 'true');
        video.setAttribute('playsinline', 'true');
    }

    // Create source for the video element
    let source = document.createElement('source');
    source.src = videoSrc;
    source.type = 'video/mp4';

    // Append source to video
    video.appendChild(source);

    // Append video to overlay
    overlay.innerHTML = ''; // Clear any existing video
    overlay.appendChild(video);

    // Initialize video.js on the new video element
    let player = videojs(video, {
        techOrder: ["html5"], // force HTML5 player
        nativeControlsForTouch: false, // prevent default fullscreen mode on touch devices
        autoplay: true,
        controls: false
    });

    // Display the overlay
    overlay.style.display = 'flex';

    // Adjust the video size
    adjustVideoSize();

    // Handle end of video
    player.on('ended', function() {
        overlay.style.animation = 'fade-out 1s';
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.style.animation = 'fade-in 1s';
        }, 1000);
    });

    // Close the video when overlay is clicked
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay || event.target === video) {
            player.pause();
            overlay.style.animation = 'fade-out 1s';
            setTimeout(() => {
                overlay.style.display = 'none';
                overlay.style.animation = 'fade-in 1s';
            }, 1000);
        }
    });

    // Same event for touchstart to handle mobile interactions
    overlay.addEventListener('touchstart', (event) => {
        if (event.target === overlay || event.target === video) {
            player.pause();
            overlay.style.animation = 'fade-out 1s';
            setTimeout(() => {
                overlay.style.display = 'none';
                overlay.style.animation = 'fade-in 1s';
            }, 1000);
        }
    });
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let videoSrc = button.getAttribute('data-video');
        playVideoFromSource(videoSrc);
    });
});

// Add click event listener to menu items with a data-video attribute
menuItems.forEach(menuItem => {
    let videoSrc = menuItem.getAttribute('data-video');
    if (videoSrc) {
        menuItem.addEventListener('click', () => {
            // Close the menu overlay
            closeButton.style.display = 'none';
            menuButton.style.display = 'block';
            menuOverlay.style.animation = 'fade-out 1s forwards';
            setTimeout(() => {
                menuOverlay.style.display = 'none';
                menuOverlay.style.animation = '';
            }, 1000);

            // Play the video
            playVideoFromSource(videoSrc);
        });
    }
});

// Menu button functionality
menuButton.addEventListener('click', () => {
    menuButton.style.display = 'none';
    closeButton.style.display = 'block';
    menuOverlay.style.display = 'flex';
});

closeButton.addEventListener('click', () => {
    closeButton.style.display = 'none';
    menuButton.style.display = 'block';
    menuOverlay.style.animation = 'fade-out 1s forwards';
    setTimeout(() => {
        menuOverlay.style.display = 'none';
        menuOverlay.style.animation = '';
    }, 1000);
});

// UPD2