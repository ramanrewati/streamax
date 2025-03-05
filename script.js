document.addEventListener("DOMContentLoaded", async function () {
    const mpdUrl = "https://abmyxykaaaaaaaamkyvb65fuqebyg.7a77200bf98444ac997a89ed83775793.emt.cf.ww.aiv-cdn.net/iad-nitro/live/clients/dash/enc/f60kqesunw/out/v1/a435ed7a00f947deb4369b46d8f2fb70/cenc.mpd";
    const video = document.getElementById("videoPlayer");
    const playBtn = document.querySelector('.play-btn');
    if (!shaka.Player.isBrowserSupported()) {
        console.error("Shaka Player is not supported in this browser.");
        return;
    }

    const player = new shaka.Player(video);

    const drmConfig = {
        clearKeys: {
            "1779c27b9d077a3ba0c9cc1bb9a94b9f": "cc5cf3b7928fb9e0a1ee6a8b566f0a8e"
        }
    };

    player.configure({ drm: drmConfig });

    // Custom play button handler
    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playBtn.style.display = 'none';
        } else {
            video.pause();
            playBtn.style.display = 'block';
        }
    });

    video.addEventListener('play', () => playBtn.style.display = 'none');
    video.addEventListener('pause', () => playBtn.style.display = 'block');

    try {
        await player.load(mpdUrl);
    } catch (error) {
        console.error("Error loading video:", error);
    }
});