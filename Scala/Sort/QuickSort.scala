object QuickSort {
  def main(args: Array[String]) {
    var arr = Array(5, 7, 3, 4, 10, 6, 8)
    println(get_sorted(arr).mkString(", "))
    println(arr.mkString(", "))
    sort(arr)
    println(arr.mkString(", "))
  }

  // Space: O(n), actual array is unchanged
  def get_sorted(xs: Array[Int]): Array[Int] = {
    if (xs.length <= 1) xs
    else {
      val pivot = xs(xs.length / 2)
      Array.concat(
        get_sorted(xs.filter(pivot >)),
                   xs.filter(pivot ==),
        get_sorted(xs.filter(pivot <))
      )
    }
  }

  // In-place (loose def), modifying argument array
  def sort(array: Array[Int]) {
    def swap(i: Int, j: Int) {
      val t = array(i)
      array(i) = array(j)
      array(j) = t
    }

    def sort1(l: Int, r: Int) {
      val pivot = array((l + r) / 2)
      var i = l
      var j = r

      while (i <= j) {
        while (array(i) < pivot) i += 1
        while (array(j) > pivot) j -= 1
        if (i <= j) {
          swap(i, j)
          i += 1
          j -= 1
        }
      }
      if (l < j) sort1(l, j)
      if (j < r) sort1(i, r)
    }
    sort1(0, array.length - 1)
  }
}