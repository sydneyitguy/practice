<?php
/**
 * Square Roots by Newton’s Method
 *
 * y        x/y                 (y + x/y) / 2
 * 1        2/1 = 2             1.5
 * 1.5      2/1.5 = 1.3333      1.4167
 * 1.4167   2/1.4167 = 1.4118   1.4142
 * 1.4142   ...                 ...
 */

class Float

class SquareRoot {
  private $tolerance = 0.0001;

  public function get($x) {
    return round($this->sqrtIter(1.0, $x), 4);
  }

  private function sqrtIter($guess, $x) {
    if($this->isCloseEnough($guess, $x))
      return $guess;
    else
      return $this->sqrtIter(($guess + $x/$guess) / 2, $x);
  }

  private function isCloseEnough($guess, $x) {
    if(abs($guess * $guess - $x) < $this->tolerance)
      return true;

    return false;
  }
}

$SquareRoot = new SquareRoot();
var_dump($SquareRoot->get(2));

