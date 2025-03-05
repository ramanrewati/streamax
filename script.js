document.addEventListener("DOMContentLoaded", function () {
    jwplayer("videoPlayer").setup({
        file: "https://otte.live.fly.ww.aiv-cdn.net/bom-nitro/live/clients/dash/enc/9ekont5e8k/out/v1/e6aaa1b986d0434b95156e22db44eb71/cenc.mpd",
        type: "dash",
        drm: {
            clearkey: {
                "keyId": "8e73c8415d7648e10b06000b1ace5953",
                "key": "f5d649bf1495cd0864a7422624ac5a86"
            }
        },
        width: "100%",
        aspectratio: "16:9",
        autostart: true
    });
});
