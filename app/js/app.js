document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initBurgerMenu();
});

function initSlider() {
    const prevButtonClass = '.js-slider-prev-button'
    const nextButtonClass = '.js-slider-next-button'
    const prevButton = document.querySelector(`${prevButtonClass}`)
    const nextButton = document.querySelector(`${nextButtonClass}`)

    let prevIndex, nextIndex, prevSliderImage, nextSliderImage

    const slider = new Swiper('.swiper', {
        loop: true,
        speed: 700,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            prevEl: prevButtonClass,
            nextEl: nextButtonClass,
        },
        on: {
            slideChange: function (swiper) {
                prevIndex = swiper.activeIndex - 1 === -1 ? swiper.slides.length - swiper.realIndex - 1 : swiper.activeIndex - 1
                nextIndex = swiper.activeIndex === swiper.slides.length - 1 ? swiper.slides.length - swiper.activeIndex + 1 : swiper.activeIndex + 1

                prevSliderImage = this.slides[prevIndex].querySelector('.js-slider-image')
                nextSliderImage = this.slides[nextIndex].querySelector('.js-slider-image')

                prevButton.style.backgroundImage = `url(${prevSliderImage.getAttribute('src')})`
                nextButton.style.backgroundImage = `url(${nextSliderImage.getAttribute('src')})`
            },
        }
    });
}

function initBurgerMenu() {
    const activeClass = 'is-active'
    const openedClass = 'is-opened'
    const burgerButton = document.querySelector('.js-burger-button')
    const mobileMenu = document.querySelector('.js-mobile-menu')
    const links = mobileMenu.querySelectorAll('a')

    burgerButton.addEventListener('click', () => {
        burgerButton.classList.toggle(activeClass)
        mobileMenu.classList.toggle(openedClass)
    })

    links.forEach(link => {
        link.addEventListener('click', () => {
            if (burgerButton.classList.contains(activeClass) && mobileMenu.classList.contains(openedClass)) {
                burgerButton.classList.remove(activeClass)
                mobileMenu.classList.remove(openedClass)
            }
        })
    })
}