document.addEventListener("DOMContentLoaded", function () {
    var player = videojs("video", {
        techOrder: ["html5"],
        controls: true,
        autoplay: true,
        fluid: true,  // Responsive design
        sources: [{
            src: "https://otte.live.cf.ww.aiv-cdn.net/pdx-nitro/live/clients/dash/enc/rkyxparx1t/out/v1/fe9782633a364a6a84c9410f26d9b2c4/cenc.mpd",
            type: "application/dash+xml"
        }]
    });

    // Enable DRM
    player.ready(function () {
        this.eme();  // Activate DRM plugin
        this.src({
            src: "https://otte.live.cf.ww.aiv-cdn.net/pdx-nitro/live/clients/dash/enc/rkyxparx1t/out/v1/fe9782633a364a6a84c9410f26d9b2c4/cenc.mpd",
            type: "application/dash+xml",
            keySystems: {
                "org.w3.clearkey": {
                    keys: {
                        "494c5ddd4a2b9c38da05e053c0fd6d3f": "ad1ff8c72fc6fefbce716609da9347cf"
                    }
                }
            }
        });
    });
});
