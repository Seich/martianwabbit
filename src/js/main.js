$(function() {
	var mobile = window.matchMedia("only screen and (min-width : 320px) and (max-width : 480px)");
	if (mobile.matches) {
		return;
	}

	var height = $(window).height();

	$(window).on('scroll', function() {
		var scrollTop = $(window).scrollTop();
		var article_offsets = $('article').map(function(i) { 
			if (i === 0) {
				return 0;
			}

			return $(this).offset().top 
		});

		if (scrollTop > 100) { // 100 is the distance from top.
			$('.sidebar').addClass('fixed');
		} else {
			$('.sidebar').removeClass('fixed');
		}

		for (var i = 0; i < article_offsets.length; i++) {
			if (article_offsets[i] - 40 <= scrollTop) {
				$('.sidebar li').removeClass('active').eq(i).addClass('active');
			}
		};
	});

	$(window).scroll();
});
