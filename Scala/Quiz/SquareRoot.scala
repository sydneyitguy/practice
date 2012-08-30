/**
 * Square Roots by Newton’s Method
 *
 * y        x/y                 (y + x/y) / 2
 * 1        2/1 = 2             1.5
 * 1.5      2/1.5 = 1.3333      1.4167
 * 1.4167   2/1.4167 = 1.4118   1.4142
 * 1.4142   ...                 ...
 */

object SquareRoot {
  val toFixed = 3
  var count = 0

  def main(args: Array[String]) {
    println("%1." + toFixed + "f" format sqrtIter(1, 2))
    println("Count: " + count)
  }

  def sqrtIter(guess: Double, x: Double): Double =
    if (isGoodEnough(guess, x)) guess
    else sqrtIter(improve(guess, x), x)

  def improve(guess: Double, x: Double) = {
    count = count + 1
    (guess + x / guess) / 2
  }

  // FIXME: wrong
  def isGoodEnough(guess: Double, x: Double) =
    (guess * guess - x).abs < math.pow(0.1, toFixed)
}