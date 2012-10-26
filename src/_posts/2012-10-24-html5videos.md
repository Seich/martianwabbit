---
layout: post
title: "Implementing HTML5 Video fallbacks"
---

The new video tag in HTML5 has to be one of the biggest dissapointments I've had in the recent years. It has nothing to do with how it works because, when it does work it is awesome but when it doesn't, there's a lot of pain involved. This is mostly due to formats, I won't be getting into this as much since, it's been discussed a lot lately.

I'll be discussing how to handle fallbacks. The current way to do it, basically uses the video tag where available and fallbacks to flash. This is fine, except that the requirements to use pure html video, involves uploading the same video in different formats. This sucks. Ideally you'd be able to use a single format but, browsers don't agree on what format to use so, you need to provide various "sources" to cater to all these differences.

The problem truly appears when you only want to use one source. For example: If you provide an MP4 video, you'd expect Chrome and Safari to be able to play it and everyone else who doesn't support it to fallback to flash. Unfortunately, most solutions out there will only check if they video tag is supported and then let the browser handle the rest. If you only provided the MP4 source, this will break in Firefox, who will only tell you it's not supported.

The solution to this is quite forward, all you need to do is check the formats provided and check if they can be played by the browser and fallback based on this rather than on the video tag being supported. Here's a simple solution to this issue (I use flowplayer because I love it's javascript API and jQuery because I don't feel like writting too much) :

    var Hello = "World";
    // How are you doing.