---
layout: post
title: "Setting up Ruby on Rails System Tests on WSL with Docker"
---

For some context, I recently started a new RoR project on Windows. The process went remarkably smooth. Everything worked out of the box. Well, everything except for system tests.

It turns out Capybara will, by default, any chrome instance installed on your local machine. That's normally great except for when there isn't one available. Luckily there is a surprisingly easy way to achieve this in a cross-platform way. Docker. There are great docker images that can run a headless Chrome or Firefox instance for you, selenium even has a hub to administrate all of these instances. The configuration for this within rails is easy but poorly documented which brings us to this post.

To get started you should setup Selenium hub and a browser or two, if you are using docker already it's as simple as creating this `docker-compose.yml` file:

```yaml
version: '3.1'
services:
  hub:
    image: selenium/hub:3.141.59-20200515
    ports: 
      - '4444:4444'

  chrome:
    image: selenium/node-chrome:3.141.59-20200515
    volumes:
      - /dev/shm:/dev/shm
    depends_on:
      - hub
    environment:
      HUB_HOST: hub
      HUB_PORT: 4444
```

Once that's setup and running we can now go ahead and tell rails to use this hub for all of our testing needs. The first thing we have to do is remove `webdrivers` from our `gemfile`. As long as that's installed capybara will keep trying to use our local chrome instead.

Now we have to change the default chrome driver to use the selenium hub instead:

```ruby
# application_system_test_case.rb 
require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :chrome, screen_size: [1600, 1080], options: {
    url: "http://localhost:4444/wd/hub",
    desired_capabilities: Selenium::WebDriver::Remote::Capabilities.chrome(
      chromeOptions: { args: %w[headless window-size=1600x1080] },
    )
  }
end
```

This would be mostly it if we are running rails containerized as well but since my rails runs on the host machine we need to tell headless chrome to visit rails on the host machine so you also have to modify the setup code:

```ruby
# application_system_test_case.rb 
require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  ...

 def setup
   Capybara.server_host = "0.0.0.0"
   Capybara.server = :puma, { Threads: "1:1" }
   Capybara.app_host = "http://host.docker.internal:#{Capybara.current_session.server.port}"
   host! "http://host.docker.internal:#{Capybara.current_session.server.port}"
   super
 end
end
```

The key idea here is that rails instances created by capybara when testing should be bound to `0.0.0.0` so they are available to the chrome container, these will get a random port assigned and we can use it along with `host.docker.internal` to allow chrome to connect to it.

It turns out it's pretty easy to setup once you figure it out!
