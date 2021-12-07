const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo () {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
      console.log(localMediaStream)
      // console.log(window.URL.createObjectURL(localMediaStream))
      video.srcObject = localMediaStream
      video.play()
    })
    .catch(err => {
      console.log('Oh man' + err)
    })
}

function paintToCanvas () {
  const width = video.videoWidth
  const height = video.videoHeight
  
  console.log({width, height})
  
  canvas.width = width
  canvas.height = height

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)

    // get the pixels
    let pixels = ctx.getImageData(0,0, width, height)
    // alter the pixels
    pixels = rgbSplit(pixels)
    ctx.globalAlpha = .8
    // put the back
    ctx.putImageData(pixels, 0, 0)
  }, 16)
  
}

function takePhoto () {
  snap.currentTime = 0
  snap.play()
  const data = canvas.toDataURL('image/jpeg')
  // console.log(data)
  const link = document.createElement('a')
  link.href = data
  link.setAttribute('download', 'handsome')
  link.innerHTML = `<img src=${data} alt='handsome man' />`
  strip.insertBefore(link, strip.firstChild)
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200 // r
    pixels.data[i + 1] = pixels.data[i + 1] + 50 // g
    pixels.data[i + 2] = pixels.data[i + 2] + 5 // b
  }

  return pixels
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0] // r
    pixels.data[i + 500] = pixels.data[i + 1] // g
    pixels.data[i - 150] = pixels.data[i + 2] // b
  }

  return pixels
}

function greenScreen (pixels) {
  const levels = {}

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value
  })
}

getVideo()

video.addEventListener('canplay', paintToCanvas)