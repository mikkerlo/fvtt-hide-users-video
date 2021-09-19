Hooks.on("renderCameraViews", () => {
  let users = Array.from(game.users.values());
  let usernames = new Set();
  users.forEach(c => usernames.add(c.name));

  users.filter(c => usernames.has(c.name + "Video"))
        .map(c => ui.webrtc.getUserCameraView(c.id))
        .filter(c => c != null)
        .forEach(c => c.style.display = "None");
});
