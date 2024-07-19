$(document).ready(function () {
    // Initial state of images
    $('.project img').hide();
    $('#projectImage2').show();

    // Onclick event on project cards to display corresponding image
    $('.project-cards .card').click(function () {
        var imageIndex = $(this).data('image');
        $('.project img').hide();
        $('#projectImage' + imageIndex).show();

        $('.project-cards .card').removeClass('active');
        $(this).addClass('active');
    });

    // Slider variables
    var slider = $('.services-slider');
    var slides = $('.slide');
    var dotsContainer = $('.slider-dots');

    // Generate dots for every second slide
    slides.each(function (index) {
        if (index % 2 === 0) {
            dotsContainer.append('<span class="dot" data-index="' + index + '"><span></span></span>');
        }
    });

    // Select the first dot by default
    var dots = $('.dot');
    dots.eq(0).addClass('active');

    // Function to update the active dot based on slider position
    function updateDots() {
        var scrollLeft = slider.scrollLeft();
        var slideWidth = slides.first().outerWidth(true);
        var currentIndex = Math.round(scrollLeft / slideWidth);
        dots.removeClass('active');
        dots.eq(currentIndex).addClass('active');
    }

    // Update dots on slider scroll
    slider.on('scroll', function () {
        updateDots();
    });

    // Handle dot click event to scroll to the corresponding slide
    dots.click(function () {
        var index = $(this).data('index');
        var slideWidth = slides.first().outerWidth(true);
        slider.animate({ scrollLeft: slideWidth * index }, 200);
    });

    // Initial update for dots
    updateDots();

    // Submit event to handle contact us form submission
    $('#contactForm').on('submit', function (event) {

        $.ajax({
            url: this.action,
            method: this.method,
            data: new FormData(this),
            processData: false,
            contentType: false,
            success: function (response) {
                $('#contactForm')[0].reset(); // Reset form fields
                $('.submit-btn').prop('disabled', true); // Disable submit button
            },
            error: function () {
                console.error('Form submission failed'); // Log error if submission fails
            }
        });
    });
});
