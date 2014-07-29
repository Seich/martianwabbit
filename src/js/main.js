/*
$(function() {

	$(window).on('scroll', function() {
		var scrollTop = $(window).scrollTop();
		var article_offsets = $('article').map(function(i) { 
			if (i === 0) {
				return 0;
			}

			return $(this).offset().top 
		});

		for (var i = 0; i < article_offsets.length; i++) {
			if (article_offsets[i] - 40 <= scrollTop) {
				$('.sidebar li').removeClass('active').eq(i).addClass('active');
			}
		};
	});

	$(window).scroll();
});
 */

var throttle = function(fn, time) {
	var ran = false;
	if (typeof time === 'undefined') {
		time = 10;
	}

	return function() {
		if (ran) { return; }
		
		fn();

		ran = true;
		setTimeout(function() {
			ran = false;
		}, time);
	};
};

document.addEventListener('DOMContentLoaded', function() {
	// Don't execute the code if screen's mobile-sized.
	var mobile = window.matchMedia("only screen and (min-width : 320px) and (max-width : 480px)");
	if (mobile.matches) { return; }

	var sidebar = document.querySelector('.sidebar');
	var sidebar_articles = Array.prototype.slice.call(document.querySelectorAll('.sidebar li'));
	var articles = Array.prototype.slice.call(document.querySelectorAll('article'));
	
	// Handle the menu's fixed state.
	window.addEventListener('scroll', throttle(function() {
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		if (scrollTop > 100) {
			sidebar.classList.add('fixed');
		} else {
			sidebar.classList.remove('fixed');			
		}
	}));


	window.addEventListener('scroll', function() {	
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		var article_offsets = articles.map(function(article, i) { 
			if (i === 0) {
				return 0;
			}

			return article.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
		});

		for (var i = 0; i < article_offsets.length; i++) {
			if (article_offsets[i] - 40 <= scrollTop) {
				var active = document.querySelector('.sidebar li.active');
				if (active !== null && active.length !== 0) {
					active.classList.remove('active');
				}

				sidebar_articles[i].classList.add('active');
			}
		};
	});

});