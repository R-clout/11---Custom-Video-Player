//get all document
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = player.querySelector(".fullscreen-button")

//create functions
function videoPlay(){
    const media = video.paused ? 'play' : 'pause';
    video[media]();
}

function updateToggle(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    video.currentTime += parseInt(this.dataset.skip);
}

function updateRanges(){
   video[this.name] = this.value;
}

function duration(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function fullScreen(){
    video.requestFullscreen();
}
//add functions to event listener
video.addEventListener('click', videoPlay);
video.addEventListener('play', updateToggle);
video.addEventListener('pause', updateToggle);
video.addEventListener('timeupdate', duration);
fullscreenButton.addEventListener('click', fullScreen);

toggle.addEventListener('click', videoPlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', updateRanges));

let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('click',(e) => mousedown && scrub(e));  
progress.addEventListener('mousedown', () => mousedown = true);  
progress.addEventListener('mouseup', () => mousedown = false);  
