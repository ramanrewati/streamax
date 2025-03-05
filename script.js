document.addEventListener('DOMContentLoaded', function() {
    shaka.polyfill.installAll();
    if (!shaka.Player.isBrowserSupported()) {
      console.error('Browser not supported!');
      return;
    }
    var video = document.getElementById('video');
    var videoContainer = document.getElementById('video-container');
    var manifestUri = 'https://abmyxykaaaaaaaamkyvb65fuqebyg.7a77200bf98444ac997a89ed83775793.emt.cf.ww.aiv-cdn.net/iad-nitro/live/clients/dash/enc/f60kqesunw/out/v1/a435ed7a00f947deb4369b46d8f2fb70/cenc.mpd';
    var player = new shaka.Player(video);
    player.addEventListener('error', onErrorEvent);
    player.configure({
      drm: {
        clearKeys: {
          '1779c27b9d077a3ba0c9cc1bb9a94b9f': 'cc5cf3b7928fb9e0a1ee6a8b566f0a8e'
        }
      },
      streaming: {
        bufferingGoal: 1,
        rebufferingGoal: 1,
        liveDelay: 0.5,
        lowLatencyMode: true,
      }
    });
    var ui = new shaka.ui.Overlay(player, videoContainer, video);
    var controls = ui.getControls();
    ui.configure({
      controlPanelElements: [
        'play_pause',
        'time_and_duration',
        'live_indicator',
        'spacer',
        'quality',
        'volume',
        'fullscreen'
      ]
    });
    player.load(manifestUri).then(function() {
      console.log('The video has now been loaded!');
    }).catch(onError);
    function onErrorEvent(event) {
      onError(event.detail);
    }
    function onError(error) {
      console.error('Error code', error.code, 'object', error);
    }
  });
  