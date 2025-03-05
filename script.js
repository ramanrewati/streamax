document.addEventListener("DOMContentLoaded", async function () {
    const mpdUrl = "https://abmyxykaaaaaaaamkyvb65fuqebyg.7a77200bf98444ac997a89ed83775793.emt.cf.ww.aiv-cdn.net/iad-nitro/live/clients/dash/enc/f60kqesunw/out/v1/a435ed7a00f947deb4369b46d8f2fb70/cenc.mpd";
    const video = document.getElementById("videoPlayer");
    const playBtn = document.querySelector('.play-btn');
    const liveBtn = document.querySelector('.live-status');
    const fsBtn = document.querySelector('.fullscreen-btn');
    const controls = document.querySelector('.player-controls');
    let controlsTimeout;
    // Initialize player
    const player = new shaka.Player(video);
    player.configure({
        drm: {
            clearKeys: {
                "1779c27b9d077a3ba0c9cc1bb9a94b9f": "cc5cf3b7928fb9e0a1ee6a8b566f0a8e"
            }
        }
    });

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
            video.currentTime = video.currentTime+30;
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

    // Event listeners
    playBtn.addEventListener('click', togglePlayback);
    video.addEventListener('click', togglePlayback);
    fsBtn.addEventListener('click', toggleFullscreen);
    liveBtn.addEventListener('click', seekToLive);

    video.addEventListener('mousemove', resetControlsTimer);
    video.addEventListener('timeupdate', () => {
        const liveEdgeThreshold = 5; 
        const isLiveEdge = video.duration - video.currentTime <= liveEdgeThreshold;
    
        liveBtn.textContent = isLiveEdge ? 'LIVE' : 'NOT LIVE';
    });

    try {
        await player.load(mpdUrl);
        video.controls = false;
        resetControlsTimer();
    } catch (error) {
        console.error("Error loading video:", error);
    }
});