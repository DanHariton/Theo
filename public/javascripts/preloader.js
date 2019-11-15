$(window).on('load', function () {
    let $preloader = $('#loaderArea');
    let $loader = $preloader.find('.loader');
    console.log($loader);
    $loader.fadeOut();
    $preloader.delay(340).fadeOut('slow');
});