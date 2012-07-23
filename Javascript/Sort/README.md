# Benchmark Results on: Intel i5 1.7GHz / 4GB 1333MHz DDR3

## Chrome/20.0.1132.57
  - Array size = 100 * 1000 times
    >---------------------------
    >     NativeSort: (   0.0420)
    >      QuickSort: (   0.0390)
    >     QuickSort2: (   0.0130)
    >      MergeSort: (   0.0800)
    >-------------- total: 0.1740

  - Array size = 1000 * 1000 times
    >---------------------------
    >     NativeSort: (   0.6490)
    >      QuickSort: (   2.9360)
    >     QuickSort2: (   0.1650)
    >      MergeSort: (   1.2790)
    >-------------- total: 5.0290

## Firefox/12.0
  - Array size = 100 * 1000 times
    >---------------------------
    >     NativeSort: (   0.1060)
    >      QuickSort: (   0.0350)
    >     QuickSort2: (   0.0140)
    >      MergeSort: (   0.0990)
    >-------------- total: 0.2540

  - Array size = 1000 * 1000 times
    >---------------------------
    >     NativeSort: (   1.4760)
    >      QuickSort: (   2.1690)
    >     QuickSort2: (   0.1650)
    >      MergeSort: (   1.4890)
    >-------------- total: 5.2990

## Safari/5.1.7(7534.57.2)
  - Array size = 100 * 1000 times
    >---------------------------
    >     NativeSort: (   0.0120)
    >      QuickSort: (   0.0550)
    >     QuickSort2: (   0.0160)
    >      MergeSort: (   0.0920)
    >-------------- total: 0.1750

  - Array size = 1000 * 1000 times
    >---------------------------
    >     NativeSort: (   0.1830)
    >      QuickSort: (   3.8790)
    >     QuickSort2: (   0.2220)
    >      MergeSort: (   1.3030)
    >-------------- total: 5.5870