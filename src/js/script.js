 $(document).ready(function () {
     $('.carousel__inner').slick({
         infinite: true, //бесконечное листание
         speed: 1200, //скорость смены кадров в мс       
         adaptiveHeight: true, //автоматическая адаптивность
         variableWidth: true,
         centerMode: true,         
         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
         nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
         responsive: [
            {
             breakpoint: 992,
             settings: {
                 //dots: true,
                 adaptiveHeight: true,
                 centerMode: true,
                 arrows: true
             }
            },
            {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  adaptiveHeight: true,
                  centerMode: true,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 570,
                settings: {
                  slidesToShow: 1,
                  arrows: false,
                  centerMode: true,
                  dots: false,
                  adaptiveHeight: true,
                  autoplay: true,
                  autoplaySpeed: 2000,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 450,
                settings: {
                  slidesToShow: 1,
                  arrows: false,
                  centerMode: true,
                  dots: false,
                  adaptiveHeight: true,
                  autoplay: true,
                  autoplaySpeed: 2000,
                  slidesToScroll: 1
                }
              }
        ]
     });
     $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
         $(this)
             .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
             .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
     });

     

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
               e.preventDefault();
               $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
               $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal

    //открытие окна
    $('[data-modal="consultation"]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');//скорость анимации
    });//выделили элемент по дата-атрибуту 

    //закрытие окна
    $('.modal__close').on('click', function () {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    })

   
    //при клике на кнопку "купить"
    $('.button_mini').each(function(i) {
      $(this).on('click', function () {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());//вытащили текст из карточки товара
        $('.overlay, #order').fadeIn('slow');
      })
    });

    //валидация форм       
   

    function valideForms(form) {
      $(form).validate({
        rules: {
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, введите свое имя",
            minlength: jQuery.validator.format('Введите {0} символа')
          },
          phone: "Пожалуйста, введите свой номер телефона",
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Неправильно введен адрес почты"
          }
        }
      });
    };

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //отправка писем
    $('form').submit(function(e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
          $(this).find('input').val('');
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');
          
          $('form').trigger('reset');
      });
      return false;
    });

    //плавный скролл и pageup
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $('a[href^="#up"]').click(function() {
      const _href = $(this).attr('href');
      $('html, body').animate({scrollTop: $(_href).offset().top+'px'});
      return false;
    });


    //animation
    new WOW().init();


 });