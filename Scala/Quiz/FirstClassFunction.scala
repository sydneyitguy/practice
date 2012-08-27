object FirstClassFunction {
  def main(args: Array[String]) {
    println(sum(x => x)(1, 5), sum2(x => x)(1, 5))
    println(sum(x => x * x)(1, 5), sum2(x => x * x)(1, 5))
    println(sum(powerOfTwo)(1, 5), sum2(powerOfTwo)(1, 5))
  }

  // Sum all return values of f between two given numbers a and b
  // function-returning function - syntactic sugar
  def sum(f: Int => Int)(a: Int, b: Int): Int =
    if(a > b) 0 else f(a) + sum(f)(a + 1, b)

  // The same function with above, but "tail-recursion" - constant space
  def sum2(f: Int => Int)(a: Int, b: Int): Int = {
    def iter(a: Int, result: Int): Int = {
      if(a > b) result
      else iter(a + 1, f(a) + result)
    }
    iter(a, 0)
  }

  def powerOfTwo(x: Int): Int = if(x == 0) 1 else 2 * powerOfTwo(x - 1)
}