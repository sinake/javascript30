const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullscreen = player.querySelector('.fullscreen')

// plays the video
function togglePlay () {
  video.paused ? video.play() : video.pause()
}
// handles play and pause icon
function handleIcon () {
  const icon = this.paused ? '►' : '❚ ❚'
  toggle.textContent = icon
}

// handles the skip functionality 
function skip () {
  video.currentTime += parseInt(this.dataset.skip)
}

function handleRange () {
  video[this.name] = this.value
  console.log(this.value)
}

function handleProgress () {
  const timeInPercent = (video.currentTime / video.duration ) * 100
  progressBar.style.flexBasis = `${timeInPercent}%`
}

function handleFullScreen () {
  video.requestFullscreen()
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', handleIcon)
video.addEventListener('pause', handleIcon)
toggle.addEventListener('click', togglePlay)
skipButtons.forEach((button) => button.addEventListener('click', skip))
ranges.forEach((range) => range.addEventListener('change', handleRange))
// ranges.forEach((range) => range.addEventListener('mousedown', handleRange))
video.addEventListener('timeupdate', handleProgress)
progress.addEventListener('click', (e) => {
  const progressClick = (e.offsetX / progress.offsetWidth) * video.duration
  console.log(progressClick)
  video.currentTime = progressClick
})
fullscreen.addEventListener('click', handleFullScreen)
