document.addEventListener("DOMContentLoaded", async function () {
    const mpdUrl = "https://otte.live.fly.ww.aiv-cdn.net/pdx-nitro/live/clients/dash/enc/1jii7mxinw/out/v1/fe9782633a364a6a84c9410f26d9b2c4/cenc.mpd";
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
                "553a8e7efc48840b17d03797c023d9b6": "05fa313fa73df33f19e0f2d3d047bbaf"
            }
        },
        streaming: {
            defaultPresentationDelay: 5
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
            video.currentTime = video.currentTime+26;
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
        const seekRange = player.getSeekRange();
        const isLiveEdge = video.currentTime >= seekRange.end - 1;
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
