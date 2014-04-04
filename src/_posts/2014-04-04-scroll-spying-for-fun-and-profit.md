---
layout: post
title: "Scroll Spying for Fun and Profit"
---
I recently redesigned by blog. One of the new features is a menu that highlights the current post you are on.
<img src="http://f.cl.ly/items/133x0c1u0K0g0Y3g0g1W/scrollspying.gif" class="small">

To achieve this, I used [Zepto](http://zeptojs.com/) and a small amount of math. (The great thing about Zepto is that it's fully compatible with jQuery, so this should work with jQuery out of the both as well).

Let's jump right in, here's how I do it:

<pre>
<code>
var article_offsets = $('article').map(function() { 
	return $(this).offset().top
});

$(window).on('scroll', function() {
	for (var i = 0; i &lt; article_offsets.length; i++) {
		if (article_offsets[i] &gt; scrollTop &amp;&amp; 
		article_offsets[i] &lt; scrollTop + $(window).height()) 
		{
			$('.sidebar li')
				.removeClass('active')
				.eq(i).addClass('active');
		}
	};
});
</code>
</pre>


The first line:
	
	var article_offsets = $('article').map(function() { 
		return $(this).offset().top 
	});
	
Grabs all of the vertical positions (from now on, offsets) of the elements I want to match and makes an array out of them. In this case, I am targeting the articles since, those represent my blog posts.

After that, I am binding an event to the window's scroll. Whenever the page is scrolled, we iterate over all of our scroll positions, if we find ourselves scrolled after one of the offsets and before the window height, we call:

	$('.sidebar li').removeClass('active').eq(i).addClass('active');
	
Which looks for the Ith element on the sidebar's list (which should match out Ith article element) and we add a class of 'active' to it, highlighting it and doing whatever we want with it.

There's a couple of other (bigger, more complex and probably more robust) solutions to this problem out there. Here's a couple I came through:

 - [http://getbootstrap.com/javascript/#scrollspy](http://getbootstrap.com/javascript/#scrollspy)
 - [http://www.outyear.co.uk/smint/](http://www.outyear.co.uk/smint/)
 - [http://scrollnav.com/](http://scrollnav.com/)
 
I am pretty sure they are plenty of others, for my evil purposes, my tiny script fulfills my needs.