document.addEventListener("DOMContentLoaded", async function () {
    const mpdUrl = "https://otte.live.fly.ww.aiv-cdn.net/bom-nitro/live/clients/dash/enc/9ekont5e8k/out/v1/e6aaa1b986d0434b95156e22db44eb71/cenc.mpd";
    const video = document.getElementById("videoPlayer");

    if (!shaka.Player.isBrowserSupported()) {
        console.error("Shaka Player is not supported in this browser.");
        return;
    }

    const player = new shaka.Player(video);

    // DRM Configuration for ClearKey
    const drmConfig = {
        clearKeys: {
            "8e73c8415d7648e10b06000b1ace5953": "f5d649bf1495cd0864a7422624ac5a86"
        }
    };

    player.configure({ drm: drmConfig });

    try {
        await player.load(mpdUrl);
        console.log("The video has loaded successfully!");
    } catch (error) {
        console.error("Error loading video:", error);
    }
});
