# Give you an array of String,
# return number of distinct strings in that array.

# @author Sebastian Kim

require 'digest/md5'

def count_distinct_string(arr)
  count = arr.length
  search = {}

  arr.each_index do |i|
    hash = Digest::MD5.hexdigest arr[i]
    if search.has_key?(hash)
      count -= 1 if arr[i] == search[hash]
    else
      search[hash] = arr[i]
    end
  end

  count
end