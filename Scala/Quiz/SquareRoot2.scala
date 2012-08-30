/**
 * Square Roots by Newton’s Method
 */

object SquareRoot2 {
  val tolerance = 0.0001

  def main(args: Array[String]) {
    println(sqrt(2))
  }

  def sqrt(x: Double) = fixedPoint(y => (y + x/y) / 2)(1.0)

  def fixedPoint(improve: Double => Double)(firstGuess: Double) = {
    def iterate(guess: Double): Double = {
      val next = improve(guess)
      println(next)
      if(isCloseEnough(guess, next)) next else iterate(next)
    }
    iterate(firstGuess)
  }

  def isCloseEnough(x: Double, y: Double) = ((x - y) / x).abs < tolerance
}