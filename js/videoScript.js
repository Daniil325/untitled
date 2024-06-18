window.addEventListener("DOMContentLoaded", function () {
    let btn = document.querySelector('.play-button')
    let videoImage = document.querySelector('.video-image')
    let videoFrame = document.querySelector('.video-frame')
    btn.addEventListener('click', (e) => {
        videoImage.classList.add('none')
        videoFrame.classList.remove('none')
        btn.classList.add('none')
    })

    const menu = document.querySelector('.menuBurger');
    const menuItems = document.querySelectorAll('.menuItem');
    const hamburger = document.querySelector('.header-burger-button');
    const closeIcon = document.querySelector('.closeBurgerMenu');
    const menuIcon = document.querySelector('.openBurgerMenu');

    function toggleMenu() {
        if (menu.classList.contains('showMenu')) {
            menu.classList.remove('showMenu');
            closeIcon.style.display = 'none';
            menuIcon.style.display = 'block';
        } else {
            menu.classList.add('showMenu');
            closeIcon.style.display = 'block';
            menuIcon.style.display = 'none';
        }
    }

    hamburger.addEventListener('click', toggleMenu);
})

