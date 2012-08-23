# Given a series of numbers as the input, the last one as the result.
# Use the rest numbers to calculate the result,only +, -, *, / are allowed.
# The order of the input cannot be changed. If there is an equation, print it; or print "no equation".
# If more than one solution, any working equation is fine.
# example:
# input: 2, 3, 1, 4
# output: 2+3-1 = 4

# Fizzbuzz solution
# @author Sebastian Kim

def find_equation(arr)
  result = arr.pop
  operators = ['+', '-', '*', '/'].repeated_permutation(arr.length - 1)
  operators.each do |op|
    eq = calc arr, op
    return eq if eval(eq) == result
  end
  puts 'no equation'
end

def calc(arr, operators)
  return false if arr.length - 1 != operators.length
  index = 1
  equation = arr[0].to_s
  operators.each do |op|
    equation << op << arr[index].to_s
    index += 1
  end
 equation
end