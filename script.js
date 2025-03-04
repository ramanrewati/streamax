document.addEventListener("DOMContentLoaded", function () {
    const manifestUri = "https://otte.live.cf.ww.aiv-cdn.net/pdx-nitro/live/clients/dash/enc/rkyxparx1t/out/v1/fe9782633a364a6a84c9410f26d9b2c4/cenc.mpd";

    const clearkeyConfig = {
        "org.w3.clearkey": {
            "clearkeys": {
                "494c5ddd4a2b9c38da05e053c0fd6d3f": "ad1ff8c72fc6fefbce716609da9347cf"
            }
        }
    };

    const video = document.getElementById("video");
    const player = dashjs.MediaPlayer().create();

    player.initialize(video, manifestUri, true);
    player.setProtectionData(clearkeyConfig);
});
