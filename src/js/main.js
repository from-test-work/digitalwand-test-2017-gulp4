// @include('detect.js')
// @include('globals.js')
svg4everybody();

/*
* @section      Components
* @Components	Init
*/
document.addEventListener('DOMContentLoaded', function () {
    mmenu();
    mobileMenu('m-toggler');

    tabs('tabs');
    tabs('aboutus_carouselTab');
    carouselInit('swiper3d');

    $("#commentForm").validate();



    // const HTML = document.documentElement;
    //
    // if (HTML.classList.contains('is-device-mobile')){
    //     let section =  document.querySelector('[data-view="desktop"]');
    //     section.remove();
    // }
}, false);


/*
 * @function    javascript
 * @Components	Tabs init
 */
function tabs(id) {

    let tab = document.getElementById(id);

    if (tab) {
        let tab__navLinks = document.querySelectorAll('#' + id + ' > .tabs__nav .tabs__nav-link');
        let tab__cntContainers = document.querySelectorAll('#' + id + ' > .tabs__cnt');
        var activeIndex = 0;

        for (let i = 0; i < tab__navLinks.length; i++) {
            let link = tab__navLinks[i];
            link.addEventListener('click', function (e) {
                e.preventDefault();
                if (i !== activeIndex && i >= 0 && i <= tab__navLinks.length) {
                    tab__navLinks[activeIndex].classList.remove('tabs__nav-link--active');
                    tab__navLinks[i].classList.add('tabs__nav-link--active');
                    tab__cntContainers[activeIndex].classList.remove('tabs__cnt--active');
                    tab__cntContainers[i].classList.add('tabs__cnt--active');
                    activeIndex = i;
                }
            });
        }
    }
}


/*
* @section      Components
* @Components	Slider
*/

function carouselInit(id) {
    if (document.getElementById(id)) {
        let swiper = new Swiper('#' + id, {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: '1',
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            },
            // autoplay: 2500,
            slideToClickedSlide: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            loop: true
        });
    }
}


/*
* @section      Components
* @Components	JQuery Validate Form
*/
$("#commentForm").validate({
    wrapper: "div"
});




/*
  Slidemenu
*/
const mmenu = () => {
    const $body = document.body;
    const $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];
    if (typeof $menu_trigger !== 'undefined') {
        $menu_trigger.addEventListener('click', () => {
            $body.className = ($body.className.indexOf("menu-active") == -1)
                ? $body.className += " menu-active"
                : $body.className = $body.className.replace(" menu-active", "");
            // $body.className = ( $body.className == 'menu-active' ) ? '' : 'menu-active';
        });
    }
}

/*
 * @function    mobile menu toogle
 * @Components
*/
const mobileMenu = (id) => {
    let menuToggle = document.getElementById(id);
    menuToggle.addEventListener('click', function (evt) {
        evt.preventDefault;
        if(!this.classList.contains(`${this.id}--opened`)){
            this.classList.add(`${this.id}--opened`)
        } else {
            this.classList.remove('m-toggler--opened');
        }
    });
}