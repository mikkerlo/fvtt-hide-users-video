Hooks.on("renderCameraViews", () => setTimeout(() => {
    const users = game.webrtc.client.getConnectedUsers();
    const username_to_userid = {}
    const VIDEO = "Video";

    for (let u of users) {
        username_to_userid[game.users.get(u).name] = u;
    }

    for ( let u of users ) {
        const user = game.users.get(u);
        let videoUserName = user.name;
        const unVideoName = user.name.slice(0, user.name.length - VIDEO.length);
        if (user.name.endsWith(VIDEO)) {
            if (username_to_userid[unVideoName]) {
                videoUserName = unVideoName;
            }
        }

        if (username_to_userid[user.name + VIDEO]) {
            continue;
        }

        let videoElement = ui.webrtc.getUserVideoElement(username_to_userid[videoUserName]);
        if ( !videoElement ) continue;
        const isSpeaking = game.webrtc._speakingData?.[u]?.speaking || false;
        game.webrtc.client.setUserVideo(u, videoElement);
        ui.webrtc.setUserIsSpeaking(u, isSpeaking);
    }

    for (let u of users) {
        const user = game.users.get(u);
        let videoUserName = user.name;
        const unVideoName = user.name.slice(0, user.name.length - VIDEO.length);
        if (user.name.endsWith(VIDEO)) {
            if (username_to_userid[unVideoName]) {
                videoUserName = unVideoName;
            }
        }

        if (videoUserName != user.name) {
            ui.webrtc.getUserCameraView(u).style.display = "none";
        }
    }
}, 100));
