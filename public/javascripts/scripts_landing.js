$(document).ready(function(){
    $('.block_two_menu').on('click', (e) => {
        
        /*
        var menu = document.getElementsByClassName('block_menu');
        
        for(i=0; i< menu.length; i++){
            menu[i].setAttribute('style', 'display: none;');
        }*/
        
        e.target.parentElement.parentElement.children[0].removeAttribute('style');
    });
    
    $(".block_menu").on("click","a", function (event) {

        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        
        event.target.parentElement.parentElement.parentElement.setAttribute('style', 'display: none;');
 
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),
 
        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
         
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });
    $(".header_right_menu").on("click","a", function (event) {

        //отменяем стандартную обработку нажатия по ссылке

        event.preventDefault();
 
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),
 
        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
         
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });
    
    $(window).scroll(function() {
        var three = $('.block_three').offset().top;
        var four = $('.block_four').offset().top;
        var five = $('.block_five').offset().top;
        if ($(this).scrollTop() + this.window.outerHeight-200 >= three && $(this).scrollTop() + this.window.outerHeight-200 < four) {
            $('.block_three .universal_left').removeAttr('style');
            $('.block_three .universal_right').removeAttr('style');
            $('.block_three .universal_bottom').removeAttr('style');
        }
        if ($(this).scrollTop() + this.window.outerHeight-200 >= four && $(this).scrollTop() + this.window.outerHeight-200 < five) {
            $('.block_four .universal_left').removeAttr('style');
            $('.block_four .universal_right').removeAttr('style');
            $('.block_four .universal_bottom').removeAttr('style');
        }

        var header = $('.header').offset().top + $('.header').height() + parseInt($('.header').css('padding-top'));

        if ($(this).scrollTop() > header){
            if (1==2){
                alert('Появляется кнопка');
            }
        }
    });
    
});
