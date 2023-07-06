const buttons = document.querySelectorAll('.video-btn');
const overlay = document.getElementById('video-overlay');
const menuButton = document.getElementById('menu-button');
const closeButton = document.getElementById('close-button');
const menuOverlay = document.getElementById('menu-overlay');
const menuItems = document.querySelectorAll('.menu-item');
const modal = document.getElementById('follow-modal');
const connectBtn = document.getElementById('connectBtn');

connectBtn.onclick = function() {
  // Add new content for the modal
  modal.innerHTML = '<p class="modalContent"><span style="font-size: 0.9em;">What is Estonian Muse?</span><br><br>Inspired by the idea of co-creation.<br>Join Kristjan Jarvi on a digital journey of beauty and self discovery.<br>Let Estoniia Muse be your guide into a future filled with inspiration and creativity.<br><br>Begin your journey now!<br><br>The Estonian frame of mind<br>Lead by the heart Built by the mind<br>Meet Estoniia, your personal muse to make sense of things. Estoniia is not just another app; its a tool that will help you unleash the genius in you and create the best version of yourself.<br>Estoniia is not just a country; its a mindset. Its the spirit of innovation, creativity, and ambition that has made Estoniia a global leader in technology and entrepreneurship. With Estoniia, you have the power to create the world you want to live in. Register today.. keep up with our Updates here and on Insta:<br><br><a href="https://www.instagram.com/estoniia_ai/" target="_blank"><img src="instagram.png" style="height: 50px;"></a><br><br><span style="font-size: 1.5em;">Keep up to date</span><br><br>Never miss a moment of inspiration. Pin this website to your home screen for quick access to inspiration and creativity. Simply follow these steps:<br><br>1. Tap the share button at the bottom of your screen (iOS) or the menu button in the top right corner of your browser (Android).<br><br>2. Select Add to Home Screen from the options.</p>';

  // Show the modal
  modal.style.display = 'block';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

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
  // Check if the device is iOS Safari
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    // Open video in fullscreen on iOS Safari
    window.open(videoSrc, '_blank', 'fullscreen=yes');
  } else {
    // Create new video element
    let video = document.createElement('video');
    video.className = 'video-js vjs-default-skin';
    video.controls = false;
    video.autoplay = true;
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');

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
    player.on('ended', function () {
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
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    let videoSrc = button.getAttribute('data-video');
    playVideoFromSource(videoSrc);
  });
});

// Add click event listener to menu items with a data-video attribute
menuItems.forEach((menuItem) => {
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
