
$(document).ready(function () {
    $('.project img').hide();
    $('#projectImage2').show();

    $('.project-cards .card').click(function () {
        var imageIndex = $(this).data('image');
        $('.project img').hide();
        $('#projectImage' + imageIndex).show();

        $('.project-cards .card').removeClass('active');
        $(this).addClass('active');
    });


    var slider = $('.services-slider');
    var slides = $('.slide');
    var dotsContainer = $('.slider-dots');

    slides.each(function (index) {
        index % 2 == 0 && dotsContainer.append('<span class="dot" data-index="' + index + '"><span></span></span>');
    });


    var dots = $('.dot');
    dots.eq(0).addClass('active');

    function updateDots() {
        var scrollLeft = slider.scrollLeft();
        var slideWidth = slides.first().outerWidth(true);
        var currentIndex = Math.round(((scrollLeft) / slideWidth));
        dots.removeClass('active');
        dots.eq(currentIndex).addClass('active');
    }

    slider.on('scroll', function () {
        updateDots();
    });

    dots.click(function () {
        var index = $(this).data('index');
        var slideWidth = slides.first().outerWidth(true);
        slider.animate({ scrollLeft: slideWidth * index }, 500);
    });

    updateDots();

    $('#contactForm').on('click', function (event) {
        $.ajax({
            url: this.action,
            method: this.method,
            data: new FormData(this),
            processData: false,
            contentType: false,
            success: function (response) {
                $('#contactForm')[0].reset();
                $('.submit-btn').prop('disabled', true);
            },
            error: function () {
                console.error('Form submission failed');
            }
        });
    });
});