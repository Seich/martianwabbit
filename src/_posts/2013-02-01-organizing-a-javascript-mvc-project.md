---
layout: post
title: "Organizing a Javascript MVC Project"
---

<p> 
I've been doing a lot of javascript development lately. My work as a frontend developer for Laureate has forced me to seirously how we organize the frontend code so it's easy to work with and hard for us to make mistakes.
</p>

<p>
As it stands, I developed the frontend structure of the project (I am not sure if I am allowed to share it) we are currently building. We use <a href="http://www.canjs.us">can.js</a> as our MVC framework of choice and use <a href="http://www.gruntjs.com/">grunt</a> to stick all the files together and check them for errors. All this, in the effort to be as agile as possible.
</p>

<p>
Comming up with a structure was pretty hard but, I think out current structure works pretty well. Our folder structure looks somewhat like this:
<p>

<pre>
    -Project
        -Application
            -Assets
                -Images
                -Css
            -Javascript
                -Models
                -Views
                -Controllers
                -libs
                    -Plugins
                    jQuery.js
                app.js
        -dist
            -app.min.js
            -libs.min.js
</pre>

<p>
It might look complicated, but it's actually fairly simple. I'll try to break it down, show how we use grunt to generate <code>app.min.js</code> and <code>libs.min.js</code> and how they all generally fit in together.
</p>