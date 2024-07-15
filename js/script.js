
$(document).ready(function () {
    $('.project img').hide(); // Hide all images initially
    $('#projectImage2').show(); // Show the second image by default

    $('.project-cards .card').click(function () {
        var imageIndex = $(this).data('image');
        console.log(imageIndex)
        $('.project img').hide(); // Hide all images
        $('#projectImage' + imageIndex).show(); // Show the selected image

        // Optional: Highlight the selected card
        $('.project-cards .card').removeClass('active');
        $(this).addClass('active');
    });


    var slider = $('.services-slider');
    var slides = $('.slide');
    var dotsContainer = $('.slider-dots');

    // Create dots
    slides.each(function (index) {
        index % 2 == 0 && dotsContainer.append('<span class="dot" data-index="' + index + '"><span></span></span>');
    });


    var dots = $('.dot');
    dots.eq(0).addClass('active'); // Set the initial active dot

    function updateDots() {
        var scrollLeft = slider.scrollLeft();
        var slideWidth = slides.first().outerWidth(true);
        console.log(scrollLeft)
        console.log(slideWidth)
        var currentIndex = Math.round(((scrollLeft) / slideWidth));
        console.log((scrollLeft) / slideWidth);
        dots.removeClass('active');
        dots.eq(currentIndex).addClass('active');
    }

    // Set up scroll event
    slider.on('scroll', function () {
        updateDots();
    });

    // Dot click event
    dots.click(function () {
        var index = $(this).data('index');
        var slideWidth = slides.first().outerWidth(true);
        slider.animate({ scrollLeft: slideWidth * index }, 500);
    });

    // Initial update of dots
    updateDots();

    // Optional: Automatic slide change
    // setInterval(function() {
    //     var nextIndex = (dots.filter('.active').data('index') + 1) % slides.length;
    //     dots.eq(nextIndex).click();
    // }, 5000); // Change slide every 5 seconds

    $('#contactForm').on('click', function (event) {
        // Simulate form submission (you may replace this part with your actual form submission logic)
        $.ajax({
            url: this.action,
            method: this.method,
            data: new FormData(this),
            processData: false,
            contentType: false,
            success: function (response) {
                // Reset the form
                $('#contactForm')[0].reset();
                // Disable the submit button
                $('.submit-btn').prop('disabled', true);
            },
            error: function () {
                console.error('Form submission failed');
            }
        });
    });
});