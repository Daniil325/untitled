(function (){
    let btn = document.querySelector('.play-button')
    let videoImage = document.querySelector('.video-image')
    let videoFrame = document.querySelector('.video-frame')
    btn.addEventListener('click', (e) => {
        videoImage.classList.add('none')
        videoFrame.classList.remove('none')
        btn.classList.add('none')
    })
})();