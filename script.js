document.addEventListener("DOMContentLoaded", async function () {
    const video = document.getElementById("videoPlayer");

    if (!shaka.Player.isBrowserSupported()) {
        console.error("Shaka Player is not supported in this browser.");
        return;
    }

    const player = new shaka.Player(video);
    
    // Configuration from provided JSON
    const playlist = [
        {
            default: false,
            type: "hls",
            file: "https://otte.live.fly.ww.aiv-cdn.net/bom-nitro/live/clients/dash/enc/9ekont5e8k/out/v1/e6aaa1b986d0434b95156e22db44eb71/cenc.mpd",
            drm: {
                fairplay: {}
            },
            label: "0"
        },
        {
            default: false,
            type: "mpd",
            file: "https://otte.live.fly.ww.aiv-cdn.net/bom-nitro/live/clients/dash/enc/9ekont5e8k/out/v1/e6aaa1b986d0434b95156e22db44eb71/cenc.mpd",
            drm: {
                clearkey: {
                    keys: {
                        "8e73c8415d7648e10b06000b1ace5953": "f5d649bf1495cd0864a7422624ac5a86"
                    }
                }
            },
            label: "1"
        },
        {
            default: true,
            type: "mpd",
            file: "https://otte.live.fly.ww.aiv-cdn.net/bom-nitro/live/clients/dash/enc/9ekont5e8k/out/v1/e6aaa1b986d0434b95156e22db44eb71/cenc.mpd",
            drm: {
                widevine: {},
                playready: {}
            },
            label: "2"
        }
    ];

    const selectedSource = playlist.find(source => source.default) || playlist[0];
    
    if (selectedSource.drm) {
        player.configure({ drm: selectedSource.drm });
    }

    try {
        await player.load(selectedSource.file);
        console.log("The video has loaded successfully!");
    } catch (error) {
        console.error("Error loading video:", error);
    }
});