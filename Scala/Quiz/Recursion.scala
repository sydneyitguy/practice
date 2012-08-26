object Recursion {
  def main(args: Array[String]) {
    println(gcd(35,14))
    println(factorial(5))
  }

  // Greatest Common Devider
  // "tail-recursive" - can be executed in constant space
  def gcd(a: Int, b: Int): Int =
    if (b == 0) a else gcd(b, a % b)

  // Factorial
  // not a "tail-recursive" - O(n) space
  def factorial(n: Int): Int =
    if (n == 1) n else n * factorial(n-1)
}