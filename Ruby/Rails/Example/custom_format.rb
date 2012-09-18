# REF: https://github.com/bbatsov/rails-style-guide#activeresource

module ActiveResource
  module Formats
    module Extend
      module CSVFormat
        extend self

        def extension
          'csv'
        end

        def mime_type
          'text/csv'
        end

        def encode(hash, options = nil)
          # Encode the data in the new format and return it
        end

        def decode(csv)
          # Decode the data from the new format and return it
        end
      end
    end
  end
end

class User < ActiveResource::Base
  self.format = ActiveResource::Formats::Extend::CSVFormat

  ...
end