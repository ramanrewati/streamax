// Initialize Shaka Player
const video = document.getElementById('video'); // Ensure you have a <video> element in your HTML
const player = new shaka.Player(video);

// Play/pause handlers
function togglePlayback() {
  if (video.paused) {
    video.play();
    playBtn.style.display = 'none';
  } else {
    video.pause();
    playBtn.style.display = 'block';
  }
}

// Fullscreen toggle
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen().catch(err => {
      console.log('Error attempting to enable fullscreen:', err);
    });
  } else {
    document.exitFullscreen();
  }
}

// Seek to live edge
function seekToLive() {
  if (player.isLive()) {
    video.currentTime = video.duration;
  }
}

// Auto-hide controls
let controlsTimeout;
function resetControlsTimer() {
  controls.classList.remove('hidden');
  clearTimeout(controlsTimeout);
  controlsTimeout = setTimeout(() => {
    controls.classList.add('hidden');
  }, 3000);
}

// Event listeners
playBtn.addEventListener('click', togglePlayback);
video.addEventListener('click', togglePlayback);
fsBtn.addEventListener('click', toggleFullscreen);
liveBtn.addEventListener('click', seekToLive);

video.addEventListener('mousemove', resetControlsTimer);
video.addEventListener('timeupdate', () => {
  liveBtn.textContent = player.isLive() ? 'LIVE' : 'NOT LIVE';
});

// Load the HLS stream
const mpdUrl = 'https://jcevents.akamaized.net/bpk-tv/JC_Sports18_1HD/JCHLS/hdntl=exp=1741585633~acl=%2f*~id=97ff5c734c6f4a3ea96b01cfd44846cc~data=hdntl~hmac=db0dbae6b8d53b386b4bc9848af7139235c4f2c36e1bc9ee44971a36249f2c20/JC_Sports18_1HD-audio_108038_eng=108000-video=3728000.m3u8';

try {
  await player.load(mpdUrl); // Load the HLS stream
  video.controls = false; // Hide native controls
  resetControlsTimer(); // Start the auto-hide controls timer
} catch (error) {
  console.error("Error loading video:", error);
}
