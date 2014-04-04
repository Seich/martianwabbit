$(function() {
	var mobile = window.matchMedia("only screen and (min-device-width : 320px) and (max-device-width : 480px)");
	if (mobile.matches) {
		return;
	}

	var height = $(window).height();
	var article_offsets = $('article').map(function() { return $(this).offset().top });

	$(window).on('scroll', function() {
		var scrollTop = $(window).scrollTop();

		if (scrollTop > 100) { // 100 is the distance from top.
			$('.sidebar').addClass('fixed');
		} else {
			$('.sidebar').removeClass('fixed');
		}

		for (var i = 0; i < article_offsets.length; i++) {
			if (article_offsets[i] > scrollTop && article_offsets[i] < scrollTop + height) {
				$('.sidebar li').removeClass('active').eq(i).addClass('active');
			}
		};
	});

	$('.sidebar li').first().addClass('active');
});
