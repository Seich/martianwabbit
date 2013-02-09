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
Coming up with a structure was pretty hard but, I think out current structure works pretty well. Our folder structure looks somewhat like this:
</p>

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
        index.html
</pre>

<p>
It might look complicated, but it's actually fairly simple. I'll try to break it down, show how we use grunt to generate <code>app.min.js</code> and <code>libs.min.js</code> and how they all generally fit in together.
</p>

<h2>Folder &amp; File Structure</h2>
<p>
The folder structure is fairly straight forward. Inside the <code>Application</code> folder we hold all of our important files. The only important folder here is the one called <code>Javascript</code>, this is where we store all of our Models, Views and Controllers which at the end, make up our entire application. You can have more folders inside of these and grunt can still fetch all of their contents to build up the final files.
</p>

<p>Here's what a raw controller inside this folder looks like:</p>
<script src="https://gist.github.com/Seich/4746478.js"></script>

<p>
As you can see the only thing we are doing which isn't immediatedly obvious is to add the controller to the namespace's Controller object. In our case, this is the window object. This is great because we don't populute the global namespace with every single controller and because we can access any controller like this: <code>Controllers.ControllerName</code>. We do the same for models:
</p>

<script src="https://gist.github.com/Seich/4746517.js"></script>

<p>
In our case, views are simple .ejs files so there's nothing special about how we define them, although you could compile them to javascript and tell grunt to minimize it along with the whole code which would probably faster.
</p>