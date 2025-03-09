document.addEventListener("DOMContentLoaded", async function () {
    const m3u8Url = "https://jcevents.akamaized.net/bpk-tv/JC_Sports18_1HD/JCHLS/hdntl=exp=1741585633~acl=%2f*~id=97ff5c734c6f4a3ea96b01cfd44846cc~data=hdntl~hmac=db0dbae6b8d53b386b4bc9848af7139235c4f2c36e1bc9ee44971a36249f2c20/JC_Sports18_1HD-audio_108038_eng=108000-video=3728000.m3u8";
    const video = document.getElementById("videoPlayer");
    const playBtn = document.querySelector('.play-btn');
    const liveBtn = document.querySelector('.live-status');
    const fsBtn = document.querySelector('.fullscreen-btn');
    const controls = document.querySelector('.player-controls');
    let controlsTimeout;

    // Initialize HLS player
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(m3u8Url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = m3u8Url;
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
    }

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

    // Auto-hide controls
    function resetControlsTimer() {
        controls.classList.remove('hidden');
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(() => {
            controls.classList.add('hidden');
        }, 3000);
    }

    // Update live/not live status
    function updateLiveStatus() {
        const isLiveEdge = video.currentTime >= (video.duration - 2);
        liveBtn.textContent = isLiveEdge ? 'LIVE' : 'NOT LIVE';
        liveBtn.style.color = isLiveEdge ? 'red' : 'white';
    }

    // Seek to live edge
    function seekToLive() {
        video.currentTime = video.duration;
    }

    // Event listeners
    playBtn.addEventListener('click', togglePlayback);
    video.addEventListener('click', togglePlayback);
    fsBtn.addEventListener('click', toggleFullscreen);
    liveBtn.addEventListener('click', seekToLive);
    video.addEventListener('mousemove', resetControlsTimer);
    video.addEventListener('timeupdate', updateLiveStatus);
    
    resetControlsTimer();
});
