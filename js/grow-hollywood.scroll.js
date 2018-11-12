var previousOffset = 0;

$(window).scroll(function(e) {
    var htmlBody        = $('html, body');
    var currentOffset   = $(".navbar").offset().top;

    $('.navbar-nav > .active').each(function() {
        if ($(this).data('navbar-custom') == 1)
            $('.navbar-fixed-top:not(.navbar-custom)').addClass('navbar-custom');
        else
            $('.navbar-fixed-top.navbar-custom').removeClass('navbar-custom');
    });

    if (!htmlBody.is(':animated'))
    {
        if (currentOffset > previousOffset && currentOffset > 0 && currentOffset < 50) {
            htmlBody.animate({
                scrollTop: $("#about").offset().top
            }, 500);
        }
        else if (currentOffset < previousOffset && !$('.navbar-fixed-top').hasClass('navbar-custom')) {
            htmlBody.animate({
                scrollTop: $("#front").offset().top
            }, 500);
        }
    }
    else
        e.preventDefault();

    previousOffset = $(".navbar").offset().top;
}).load(function() { $(this).trigger('scroll'); });

$(function () {
    $('.img-holder').imageScroll({
        container: $('body')
    });
});