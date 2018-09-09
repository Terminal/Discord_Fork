require 'mimemagic'
require 'json/ext'
require 'uri'

module ImageEncodeCache
  @@cached_base64_codes = Hash.new

  def cached_base64_codes
    @@cached_base64_codes
  end

  def cached_base64_codes= val
    @@cached_base64_codes = val
  end
end

module Jekyll
  module Tags
    class ImageEncodeTag < Liquid::Tag
      include ImageEncodeCache

      def initialize(tag_name, var, options)
        split = var.split(';')
        @var = split[0].strip
        @default = File.join(__dir__, '..', split[1].strip)
        
        fetch(@default)
        super
      end

      def fetch(url)
        image_handle = open(url)

        if self.cached_base64_codes.has_key? url
          encoded_image = self.cached_base64_codes[url]
        else
          # p "Caching #{@url} as local base64 string ..."
          encoded_image = Base64.strict_encode64(image_handle.read)
          self.cached_base64_codes.merge!(url => encoded_image)
        end

        data_type = MimeMagic.by_magic(image_handle)
        image_handle.close

        "data:#{data_type};base64,#{encoded_image}"
      end

      def render(context)
        require 'open-uri'
        require 'base64'

        encoded_image = ''
        url = @default

        begin
          # https://stackoverflow.com/questions/6672007/how-do-you-access-nested-elements-of-a-hash-with-a-single-string-key
          # Splat and dig, is the answer
          userlink = context.registers[:page].dig(*@var.split('.')) || ''

          # If the userlink is HTTP or HTTPS, set the URL to that link
          if ['http', 'https'].include?URI.parse(userlink).scheme
            url = userlink
          end

          # Return the Base64 of that URL
          fetch(url)
        rescue OpenURI::HTTPError => e
          # If an error occured, return the default
          fetch(@default)
        rescue URI::InvalidURIError => e
          # If the URI was invalid, return the default
          fetch(@default)
        end
      end
    end
  end
end

Liquid::Template.register_tag('base64', Jekyll::Tags::ImageEncodeTag)