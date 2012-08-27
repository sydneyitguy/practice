object FirstClassFunction {
  def main(args: Array[String]) {
    println(sum(x => x)(1, 5))
    println(sum(x => x * x)(1, 5))
    println(sum(powerOfTwo)(1, 5))
  }

  // Sum all return values of f between two given numbers a and b
  // function-returning function - syntactic sugar
  def sum(f: Int => Int)(a: Int, b: Int): Int =
    if(a > b) 0 else f(a) + sum(f)(a + 1, b)

  def powerOfTwo(x: Int): Int = if(x == 0) 1 else 2 * powerOfTwo(x - 1)
}