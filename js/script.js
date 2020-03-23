$(document).ready(function () {
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
    $('.counter2').counterUp({
        delay: 1,
        time: 10000
    });
    $('.counter3').counterUp({
        delay: 100,
        time: 1000000
    });

    // slick slider
    $(".slider-for1").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slick-slider1',
        autoPlay: true,
    });
    $('.slick-slider1').slick({
        centerMode: true,
        focusOnSelect: true,
        centerPadding: '60px',
        dots: true,
        infinite: true,
        autoPlay: true,
        speed: 200,
        slidesToShow: 3,
        slidesToScroll: 3,
        asNavFor: '.slider-for1',
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });


});