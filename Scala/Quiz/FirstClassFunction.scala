object FirstClassFunction {
  def main(args: Array[String]) {
    println(sumInts(1, 5))
    println(sumSqares(1, 5))
    println(sumPowerOfTwo(1, 5))
  }

  // Sum all return values of f between two given numbers a and b
  def sum(f: Int => Int, a: Int, b: Int): Int =
    if(a > b) 0 else f(a) + sum(f, a + 1, b)

  // Anonymous functions - syntactic sugar
  def sumInts(a: Int, b: Int): Int = sum(x => x, a, b)
  def sumSqares(a: Int, b: Int): Int = sum(x => x * x, a, b)

  def sumPowerOfTwo(a: Int, b:Int): Int = sum(powerOfTwo, a, b)
  def powerOfTwo(x: Int): Int = if(x == 0) 1 else 2 * powerOfTwo(x - 1)
}