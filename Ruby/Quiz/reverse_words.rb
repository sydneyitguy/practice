# Reverse words in a string
#  e.g. Input : "This is a String"
#       Output: "String a is This"

def reverse_words(string)
  words = string.split(' ').reverse.join(' ')
end