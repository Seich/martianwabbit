require "jekyll"
require "selenium-webdriver"
require "base64"
require "open-uri"

module Jekyll
  class Instagram < Liquid::Block
    include Liquid::StandardFilters

    def initialize(tag, params, context)
      @amount = params.to_i
      super
    end

    def render(context)
      desired_capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
        { args: %w[headless window-size=1600x1080] },
      )

      driver = Selenium::WebDriver.for(:remote, url: "http://hub:4444/wd/hub", desired_capabilities: desired_capabilities)

      driver.get("https://instagram.com/seichleon")

      p driver.page_source

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

Liquid::Template.register_tag("instagram", Jekyll::Instagram)
