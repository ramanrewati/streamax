document.addEventListener("DOMContentLoaded", async function () {
    const mpdUrl = "https://otte.live.cf.ww.aiv-cdn.net/pdx-nitro/live/clients/dash/enc/rkyxparx1t/out/v1/fe9782633a364a6a84c9410f26d9b2c4/cenc.mpd";
    const video = document.getElementById("videoPlayer");

    if (!shaka.Player.isBrowserSupported()) {
        console.error("Shaka Player is not supported in this browser.");
        return;
    }

    const player = new shaka.Player(video);

    // DRM Configuration for ClearKey
    const drmConfig = {
        clearKeys: {
            "494c5ddd4a2b9c38da05e053c0fd6d3f": "ad1ff8c72fc6fefbce716609da9347cf"
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
