// Video Player Setup using Shaka Player
document.addEventListener("DOMContentLoaded", async function () {
    const mpdUrl = "https://abmyxykaaaaaaaamkyvb65fuqebyg.7a77200bf98444ac997a89ed83775793.emt.cf.ww.aiv-cdn.net/iad-nitro/live/clients/dash/enc/f60kqesunw/out/v1/a435ed7a00f947deb4369b46d8f2fb70/cenc.mpd";
    const video = document.getElementById("videoPlayer");
  
    if (!shaka.Player.isBrowserSupported()) {
      console.error("Shaka Player is not supported in this browser.");
      return;
    }
  
    const player = new shaka.Player(video);
  
    // DRM Configuration for ClearKey
    const drmConfig = {
      clearKeys: {
        "1779c27b9d077a3ba0c9cc1bb9a94b9f": "cc5cf3b7928fb9e0a1ee6a8b566f0a8e"
      }
    };
  
    player.configure({ drm: drmConfig });
  
    try {
      await player.load(mpdUrl);
      console.log("The video has loaded successfully!");
    } catch (error) {
      console.error("Error loading video:", error);
    }
  
    // Fullscreen toggle: Hide header, footer, chat when in fullscreen
    document.addEventListener("fullscreenchange", function () {
      const isFullscreen = document.fullscreenElement === video;
      const elementsToHide = ["header", "footer", ".chat-container"];
      
      elementsToHide.forEach(selector => {
        document.querySelector(selector).style.display = isFullscreen ? "none" : "flex";
      });
    });
  
    // TalkJS Chat Setup
    Talk.ready.then(function () {
      const setUsernameBtn = document.getElementById("setUsernameBtn");
      const usernameInput = document.getElementById("usernameInput");
  
      setUsernameBtn.addEventListener("click", function () {
        const username = usernameInput.value.trim();
        if (!username) {
          alert("Please enter a username.");
          return;
        }
  
        // Create a TalkJS user with only a name (no email or picture)
        const currentUser = new Talk.User({
          id: username,
          name: username,
          role: "default"
        });
  
        // Initialize TalkJS session
        window.talkSession = new Talk.Session({
          appId: "tj4JESSP", // Replace with your TalkJS App ID
          me: currentUser
        });
  
        // Create or get the conversation for live chat
        const conversation = window.talkSession.getOrCreateConversation("live-chat");
        conversation.setParticipant(currentUser);
  
        // Apply your custom TalkJS theme (replace 'your-custom-theme' with the actual name)
        const inbox = window.talkSession.createInbox({
          conversation: conversation,
          theme: "livestream"
        });
  
        inbox.mount(document.getElementById("talkjs-container"));
      });
    });
  });
  