require "jekyll"
require "selenium-webdriver"
require "base64"
require "open-uri"
require "date"

module Jekyll
  class Instagram < Liquid::Block
    include Liquid::StandardFilters

    def initialize(tag, params, context)
      @cache ||= Jekyll::Cache.new("Jekyll::Instagram")
      @amount = params.to_i
      super
    end

    def render(context)
      @cache.getset(Date.today.to_s) do
        desired_capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
          { args: %w[headless window-size=1600x1080] },
        )

        driver = Selenium::WebDriver.for(:remote, url: "http://hub:4444/wd/hub", desired_capabilities: desired_capabilities)

        driver.get("https://instagram.com/seichleon")

        begin 
          username = driver.find_element(css: 'input[name="username"]')
          username.send_keys "seichleon"

          password = driver.find_element(css: 'input[name="password"]')
          password.send_keys ENV["INSTAGRAM_PASSWORD"]
          password.submit
        rescue
          puts "Login not necessary."
        end

        links = driver.find_elements(css: 'a[href^="/p/"]')
        photos = links.first(@amount).map do |link|
          img = link.find_element(css: "img")

          {
            image: "data:image/png;base64," << Base64.encode64(open(img.attribute("src")).to_a.join),
            url: link.attribute("href"),
            alt: img.attribute("alt"),
          }
        end

        driver.quit

        result = []
        context.stack do
          photos.each do |photo|
            context["image"] = photo[:image]
            context["url"] = photo[:url]
            context["alt"] = photo[:alt]

            result << @body.render(context)
          end
        end

        result
      end
    end
  end
end

Liquid::Template.register_tag("instagram", Jekyll::Instagram)
