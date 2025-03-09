// Get DOM elements
const video    = document.getElementById('videoPlayer');
const playBtn  = document.querySelector('.play-btn');
const fsBtn    = document.querySelector('.fullscreen-btn');
const liveBtn  = document.querySelector('.live-status');
const controls = document.querySelector('.player-controls');
let controlsTimeout;

// m3u8 URL (replace with your actual stream URL)
const m3u8Url = 'https://jcevents.akamaized.net/bpk-tv/JC_Sports18_1HD/JCHLS/hdntl=exp=1741585633~acl=%2f*~id=97ff5c734c6f4a3ea96b01cfd44846cc~data=hdntl~hmac=db0dbae6b8d53b386b4bc9848af7139235c4f2c36e1bc9ee44971a36249f2c20/JC_Sports18_1HD-audio_108038_eng=108000-video=3728000.m3u8';

// Initialize Shaka Player without DRM settings
const player = new shaka.Player(video);

// Listen for player errors.
player.addEventListener('error', function(event) {
  console.error('Error code', event.detail.code, 'object', event.detail);
});

// Load the m3u8 URL
player.load(m3u8Url).then(function() {
  // On successful load, disable native controls and start playback
  video.controls = false;
  video.play();
  resetControlsTimer();
}).catch(function(error) {
  console.error("Error loading video:", error);
});

// Toggle play/pause
function togglePlayback() {
  if (video.paused) {
    video.play();
    playBtn.style.display = 'none';
  } else {
    video.pause();
    playBtn.style.display = 'block';
  }
}

// Toggle fullscreen mode
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen().catch(err => {
      console.error('Error attempting to enable fullscreen:', err);
    });
  } else {
    document.exitFullscreen();
  }
}

// Seek to the live edge (for live streams)
function seekToLive() {
  // For a live stream, set currentTime near the end (i.e. live edge)
  video.currentTime = video.duration;
}

// Auto-hide controls after 3 seconds of inactivity
function resetControlsTimer() {
  controls.classList.remove('hidden');
  clearTimeout(controlsTimeout);
  controlsTimeout = setTimeout(() => {
    controls.classList.add('hidden');
  }, 3000);
}

// Event listeners for controls
playBtn.addEventListener('click', togglePlayback);
video.addEventListener('click', togglePlayback);
fsBtn.addEventListener('click', toggleFullscreen);
liveBtn.addEventListener('click', seekToLive);
video.addEventListener('mousemove', resetControlsTimer);
video.addEventListener('timeupdate', () => {
  // Update the live button text based on whether the stream is live
  liveBtn.textContent = (video.duration === Infinity) ? 'LIVE' : 'NOT LIVE';
});
