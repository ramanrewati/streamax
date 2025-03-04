document.addEventListener("DOMContentLoaded", async function () {
    const manifestUri = "https://otte.live.cf.ww.aiv-cdn.net/pdx-nitro/live/clients/dash/enc/rkyxparx1t/out/v1/fe9782633a364a6a84c9410f26d9b2c4/cenc.mpd";

    // ClearKey DRM
    const clearkeyConfig = {
        "keys": {
            "494c5ddd4a2b9c38da05e053c0fd6d3f": "ad1ff8c72fc6fefbce716609da9347cf"
        }
    };

    async function initPlayer() {
        const video = document.getElementById("video");
        const player = new shaka.Player(video);
        const ui = new shaka.ui.Overlay(player, document.getElementById("video-controls"), video);

        // Custom UI Controls
        ui.configure({
            addBigPlayButton: true,
            controlPanelElements: ["play_pause", "mute", "volume", "time_and_duration", "fullscreen"],
        });

        // Configure DRM
        player.configure({
            drm: {
                clearKeys: clearkeyConfig.keys
            }
        });

        try {
            await player.load(manifestUri);
            console.log("Stream loaded successfully!");
        } catch (error) {
            console.error("Error loading stream:", error);
        }
    }

    // Initialize player
    if (shaka.Player.isBrowserSupported()) {
        initPlayer();
    } else {
        console.error("Shaka Player is not supported on this browser.");
    }
});
