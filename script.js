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
            defaultPresentationDelay: 2, // Align with the suggested presentation delay in the MPD file
            rebufferingGoal: 10, // Reduce rebuffering goal to minimize initial delay
            bufferingGoal: 10, // Reduce buffering goal to minimize initial delay
            bufferBehind: 10, // Reduce buffer behind to minimize initial delay
            ignoreTextStreamFailures: true
        },
        abr: {
            enabled: true, // Ensure ABR is enabled for auto quality
            defaultBandwidthEstimate: 500000, // Adjust based on your network conditions
            restrictions: {
                minWidth: 640,
                minHeight: 360,
                maxWidth: 1920,
                maxHeight: 1080
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
            const seekRange = player.getSeekRange();
            const liveEdge = seekRange.end;
            const bufferAhead = player.getBufferedInfo().total.buffered.end;
            const targetTime = Math.min(liveEdge, bufferAhead);

            if (video.currentTime < targetTime) {
                video.currentTime = targetTime;
            }
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
        if (player.isLive()) {
            const seekRange = player.getSeekRange();
            const liveEdge = seekRange.end;
            const isLiveEdge = video.currentTime >= liveEdge - 1;

            liveBtn.textContent = isLiveEdge ? 'LIVE' : 'NOT LIVE';
            liveBtn.style.color = isLiveEdge ? 'red' : 'white';
        } else {
            liveBtn.textContent = 'LIVE';
            liveBtn.style.color = 'red';
        }
    }

    // Event listeners
    playBtn.addEventListener('click', togglePlayback);
    video.addEventListener('click', togglePlayback);
    fsBtn.addEventListener('click', toggleFullscreen);
    liveBtn.addEventListener('click', seekToLive);

    video.addEventListener('mousemove', resetControlsTimer);
    video.addEventListener('timeupdate', updateLiveStatus);

    try {
        await player.load(mpdUrl);
        video.controls = false;
        resetControlsTimer();
        seekToLive(); // Seek to live edge immediately after loading
    } catch (error) {
        console.error("Error loading video:", error);
    }
});
