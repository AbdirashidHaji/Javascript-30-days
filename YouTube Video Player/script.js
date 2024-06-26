let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: 'kOiyexelLGg', // Replace with your video ID
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const stopBtn = document.getElementById('stopBtn');

    playPauseBtn.addEventListener('click', () => {
        const playerState = player.getPlayerState();
        if (playerState === YT.PlayerState.PLAYING) {
            player.pauseVideo();
            playPauseBtn.textContent = 'Play';
        } else {
            player.playVideo();
            playPauseBtn.textContent = 'Pause';
        }
    });

    stopBtn.addEventListener('click', () => {
        player.stopVideo();
        player.seekTo(0);
        playPauseBtn.textContent = 'Play'; // Reset play/pause button text
    });
}

function onPlayerStateChange(event) {
    // Handle state changes if needed
}
