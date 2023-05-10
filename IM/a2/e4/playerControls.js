/* DEFINITIONS & SETUP */

let videoElement = document.getElementById("videoElement");
let playButton = document.getElementById("playButton");
let stopButton = document.getElementById("stopButton");
let muteButton = document.getElementById("muteButton");
let fullScreenButton = document.getElementById("fullScreenButton");
let loopButton = document.getElementById("loopButton");

let progressBar = document.getElementById("progressBar");


videoElement.removeAttribute("controls");

document.getElementById("controlsWrapper").style.display = "flex";

videoElement.addEventListener('loadedmetadata', () => {
  progressBar.setAttribute('max', videoElement.duration);
});


videoElement.addEventListener("playing", () => {
  
  if (!progressBar.getAttribute('max')){
    progressBar.setAttribute('max', videoElement.duration);
  }
});

/* LOADING */

videoElement.addEventListener("waiting", () => {
  progressBar.classList.add("timeline-loading");
});
videoElement.addEventListener("canplay", () => {
  progressBar.classList.remove("timeline-loading");
});

/* MEDIA FINSIHED */

videoElement.addEventListener("ended", () => {
  playButton.style.backgroundImage = "url('./icons/play.svg')";
});

/* PLAY/PAUSE */

function playPause(){
  
  if (videoElement.paused || videoElement.ended) {
    
    videoElement.play();
    
    playButton.style.backgroundImage = "url('./icons/pause.svg')";

  } else {
    
    videoElement.pause();
    
    playButton.style.backgroundImage = "url('./icons/play.svg')";

  }
}


playButton.addEventListener('click', playPause);


videoElement.addEventListener('click', playPause);


/* TIMELINE */

videoElement.addEventListener('timeupdate', () => {
  
  progressBar.value = videoElement.currentTime;
});


function scrubToTime(e){
  let x = e.clientX - (progressBar.getBoundingClientRect().left + window.scrollX);
  videoElement.currentTime = clampZeroOne(x / progressBar.offsetWidth) * videoElement.duration;
}


progressBar.addEventListener('mousedown', scrubToTime);
progressBar.addEventListener('mousedown', (e) => {
  
  window.addEventListener('mousemove', scrubToTime);
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', scrubToTime);
  });
});

/*Mute/Unmute*/

function muteUnmute(){
  if(videoElement.muted) {
    videoElement.muted = false;
    muteButton.style.backgroundImage = "url('./icons/mute.svg')";

  }
  else{
    videoElement.muted = true;
    muteButton.style.backgroundImage = "url('./icons/unmute.svg')";
  }
}

muteButton.addEventListener("click", muteUnmute);

/*loop*/

function loop(){
  videoElement.requstloop();
}

loopButton.addEventListener("click", loop);
loopButton.addEventListener('mouseenter', function() {
  loopButton.classList.add('loop');
});

loopButton.addEventListener('mouseleave', function() {
  loopButton.classList.remove('loop');
});

/*fullScreen*/

function fullScreen(){
  videoElement.requestFullscreen();
}
fullScreenButton.addEventListener('click', fullScreen);

fullScreenButton.addEventListener('mouseenter', function() {
  fullScreenButton.classList.add('zoom');
});

fullScreenButton.addEventListener('mouseleave', function() {
  fullScreenButton.classList.remove('zoom');
});


/* HELPER FUNCTIONS */

function clampZeroOne(input){
  return Math.min(Math.max(input, 0), 1);
}

function logEvent(e){
  console.log(e);
}

