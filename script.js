$(document).ready(function() {
    var numReview = 2;
    var numCourse = 5;

    //Randomize Review
    $.getJSON('review.json').done(function(data){
        var ranKeys = shuffle(Object.keys(data));
        $('#reviewcarousel .carousel-inner').remove();
        $('#reviewcarousel').append('<div class="carousel-inner"></div>');
        for(let i = 0; i < numReview; i++) {
            var ranObject = ranKeys.next().value;

            var itemDiv;
            if(i == 0) {
                itemDiv = $('<div class="carousel-item active"></div>');
            }
            else {
                itemDiv = $('<div class="carousel-item"></div>');
            }
            $('#reviewcarousel .carousel-inner').append(itemDiv);

            var contentDiv = $('<div class="row justify-content-between">');
            $(itemDiv).append(contentDiv);

            var descDiv = $('<div class="col-md-6"></div>');
            $(contentDiv).append(descDiv);
            $(descDiv).append('<h2><span class="font-semibold">Kata Orang</span></h2>');
            $(descDiv).append('<p class="mt-3">' + '"' + data[ranObject].quote + '"' + '</p>');
            $(descDiv).append('<p class="mt-5 mb-1">' + data[ranObject].name + '</p>');
            $(descDiv).append('<p class="mt-1 mb-1">' + data[ranObject].job + '</p>');
            $(descDiv).append('<p class="mt-1 mb-5">Lulusan ULearn-Ing ' + data[ranObject].course + '</p>');
            $(descDiv).append('<a class="mt-4 align-right font-semibold mb-md-0 mb-4" href="#">Baca ceritanya</a>');

            var imageDiv = $('<div class="col-lg-4 col-md-5"></div>');
            $(contentDiv).append(imageDiv);
            
            $(imageDiv).append('<img class="img-fluid" src="' + data[ranObject].image_url + '" alt="Review Image">');
        }
    });

    //Randomize Course
    $.getJSON('course.json').done(function(data){
        $.each(data, function(key, val) {
            var ranKeys = shuffle(Object.keys(val));
            $('#' + key + ' .carousel-inner').remove();
            $('#' + key).append('<div class="carousel-inner"></div>');

            for(let i = 0; i < numCourse; i++) {
                var ranObject = ranKeys.next().value;

                var itemDiv;
                if(i == 0) {
                    itemDiv = $('<div class="carousel-item active"></div>');
                }
                else {
                    itemDiv = $('<div class="carousel-item"></div>');
                }
                $('#' + key + ' .carousel-inner').append(itemDiv);

                $(itemDiv).append('<img class="img-fluid" src="' + val[ranObject].image_url + '">');

                var descDiv = $('<div class="course-desc"></div>');
                $(itemDiv).append(descDiv);
                $(descDiv).append('<h5 class="mb-0"><span class="font-semibold">' + val[ranObject].title + '</span></h5>');
                $(descDiv).append('<p class="mb-1 mt-0">' + val[ranObject].author + '</p>');

                $(itemDiv).append('<img class="img-fluid" src="' + val[ranObject].rating_url + '">');
            }
        });
    });

    $(".multiple-carousel .carousel-control-next").on("click", function () {
        var carouselWidth = $(this).closest('.multiple-carousel').children('.carousel-inner')[0].scrollWidth;
        var itemWidth = $(this).closest('.multiple-carousel').children('.carousel-inner').children('.carousel-item').width();
        var scrollPosition = parseFloat($(this).closest('.multiple-carousel').children('.scroll-position').text());
        if (scrollPosition < (carouselWidth - itemWidth * 4)) { //check if you can go any further
            //alert(scrollPosition);
            scrollPosition += itemWidth;  //update scroll position
            $(this).closest('.multiple-carousel').children('.scroll-position').text(scrollPosition);
            //document.getElementById('test').scrollLeft += 20;
            $(this).closest('.multiple-carousel').children('.carousel-inner').animate({ scrollLeft: scrollPosition },600); //scroll left
        }
    });

    $(".multiple-carousel .carousel-control-prev").on("click", function () {
        var carouselWidth = $(this).closest('.multiple-carousel').children('.carousel-inner')[0].scrollWidth;
        var itemWidth = $(this).closest('.multiple-carousel').children('.carousel-inner').children('.carousel-item').width();
        var scrollPosition = parseFloat($(this).closest('.multiple-carousel').children('.scroll-position').text());
        if (scrollPosition > 0) {
            //alert(scrollPosition);
            scrollPosition -= itemWidth;
            $(this).closest('.multiple-carousel').children('.scroll-position').text(scrollPosition);
            $(this).closest('.multiple-carousel').children('.carousel-inner').animate(
                { scrollLeft: scrollPosition }, 600
            );
        }
    });

    function* shuffle(array) {
        var i = array.length;
    
        while (i--) {
            yield array.splice(Math.floor(Math.random() * (i+1)), 1)[0];
        }
    }
});
