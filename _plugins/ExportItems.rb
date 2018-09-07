require 'json/ext'

STRINGKEYS = [
  'client_id',
  'application_id',
  'server_id'
]

module Jekyll
  class PageWithoutFile < Page
    def read_yaml(*)
      @data ||= {}
    end
  end

  class DataGenerator < Generator
    safe true

    def generate(site)
      # Iterate through all collections
      site.collections.each do |name, meta|
        # If the collection name is bots or servers, iterate through the pages
        if name == 'bots' or name == 'servers' or name == 'docs'
          all = Array.new
          keys = Array.new
          for i in 0 ... meta.docs.size
            output = meta.docs[i].data;

            # Convert keys that should be strings into strings
            STRINGKEYS.each do |key|
              if output.key?(key)
                output[key] = output[key].to_s
              end
            end

            # Export the file, naming based on the primary key
            file = PageWithoutFile.new(site, __dir__, "/api/#{name}", "#{output[output['primary_key']]}.json")
            file.content = JSON.pretty_generate(output)
            site.pages << file

            # Push the key-value object to the "all objects" array
            all << output
            keys << output[output['primary_key']]
          end

          # Export all data
          file = PageWithoutFile.new(site, __dir__, "/api/#{name}", "all.json")
          file.content = JSON.pretty_generate(all)
          site.pages << file

          # Export all keys
          file = PageWithoutFile.new(site, __dir__, "/api/#{name}", "keys.json")
          file.content = keys
          site.pages << file
        end
      end
    end
  end
end
