---
layout: post
title: "Migrating from Tumblr to Jekyll"
---

A couple of months ago I moved my blog from Tumblr over to Jekyll and started hosting it with Webfaction. 
It's been great so far but, I never quite figured out how to get rid of my old url redirecting everything to it's new 
page on the new blog. 

I originally thought I'd have to write a redirect rule for each of the posts I kept on the new blog and then make the 
subdomain redirect to to the domain. Needless to say that it felt so annoying that I ended up not doing anything at all.
Until now, that is. So here is how I fixed stuff! First of all, since I imported my Tumblr posts using the importer that 
comes with Jekyll, I had urls that looked like this: 

<code>
	http://martianwabbit.com/2011/04/04/4344642365.html
</code>

I didn't really change them, I thought that they having their old ID would be handy when I wanted to make the shift 
completely. This ended up being a good decision at the end.

So now, the only thing I needed to do was to redirect this:

<code>
http://blog.martianwabbit.com/post/4344642365/justvector-social-icons-font
</code>

to this:

<code>
http://martianwabbit.com/2011/04/04/4344642365.html
</code>

Which isn't as straight-forward since, I have no way of knowing what the date might be, so I changed the permalink 
for imported posts to this:

<code>
<pre>
---
layout: post
title: "JustVector Social Icons Font"
permalink: /post/4344642365.html
---
</pre>
</code>

So I could just do a simple URL redirect. Now, all I needed to do was setup apache so it'd redirect the URLs as intended,
that was probably the easiest part, a quick regex later I ended up with this:

<code>
<pre>
RedirectMatch \/post\/([0-9]+)\/.* /post/$1.html
</pre>
</code>

Which worked exactly as intended, now all I have to do, is for the DNS to finish propagating.