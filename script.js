document.addEventListener("DOMContentLoaded", function () {
    // DASH manifest URL
    const mpdUrl = "https://otte.live.cf.ww.aiv-cdn.net/pdx-nitro/live/clients/dash/enc/rkyxparx1t/out/v1/fe9782633a364a6a84c9410f26d9b2c4/cenc.mpd";
    const videoElement = document.getElementById("videoPlayer");
  
    if (dashjs.MediaPlayer.isSupported()) {
      // Create and initialize the dash.js player
      const player = dashjs.MediaPlayer().create();
      player.initialize(videoElement, mpdUrl, false);
  
      // Set protection data for ClearKey DRM
      player.setProtectionData({
        "org.w3.clearkey": {
          "clearkeys": {
            "494c5ddd4a2b9c38da05e053c0fd6d3f": "ad1ff8c72fc6fefbce716609da9347cf"
          }
        }
      });
    } else {
      console.error("MPEG-DASH is not supported in your browser.");
    }
  });
  