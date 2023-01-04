$(document).ready(function(){
  
	// SLIDER
	
	$('.slider__inner').slick({
		infinite: true,
		speed: 1000,
		prevArrow: '<button type="btn" class="slick-prev"><img src="./img/arrow_left.png"></button>',
		nextArrow: '<button type="btn" class="slick-next"><img src="./img/arrow_right.png"></button>',
		responsive: [
				{
					breakpoint: 767.98,
					settings: {
						arrows: false,
						dots: true,
				}
			}
		]
	});

	// TABS
	
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab--active)', function() {
    $(this)
      .addClass('catalog__tab--active').siblings().removeClass('catalog__tab--active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content--active').eq($(this).index()).addClass('catalog__content--active');
  });

	// CARD

	function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.card__front').eq(i).toggleClass('card__front--active');
                $('.card__back').eq(i).toggleClass('card__back--active');
            })
        });
    };

    toggleSlide('.card__link');
    toggleSlide('.card__link-back');


		// MODAL

		$('[data-modal=consultation]').on('click', function() {
				$('.overlay, #consultation').fadeIn();
		});
		$('.modal__close').on('click', function() {
				$('.overlay, #consultation, #order, #thanks').fadeOut();
		});

		$('.button--buy').each(function(i) {
				$(this).on('click', function() {
						$('#order .modal__desc').text($('.card__subtitle').eq(i).text());
						$('.overlay, #order').fadeIn();
				})
		});

		// VALIDATE FORMS

		function validateForms(form){
			$(form).validate({
					rules: {
							name: {
									required: true,
									minlength: 2
							},
							phone: "required",
							email: {
									required: true,
									email: true
							}
					}
			});
	};

		validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

		// MASK PHONE

		$('input[name=phone]').mask("+* (***) ***-**-**");

		// FORM SUBMISSION

		$('form').submit(function(e) {
			e.preventDefault();
			$.ajax({
					type: "POST",
					url: "#",
					data: $(this).serialize()
			}).done(function() {
					$(this).find("input").value("");
					$('#consultation, #order').fadeOut();
					$('.overlay, #thanks').fadeIn();

					$('form').trigger('reset');
			});
			return false;
	});

		// SMOOTH SCROLL AND PAGE UP

		$(window).scroll(function() {
				if ($(this).scrollTop() > 1600) {
						$('.pageup').fadeIn();
				} else {
					$('.pageup').fadeOut();
				}
		});

		$("a[href=#up]").click(function(){
				const _href = $(this).attr("href");
				$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
				return false;
		});

		new WOW().init();
});