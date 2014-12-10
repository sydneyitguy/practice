// Use "Any" type - <Protocol Type>
func peek(interestingValue: Any) -> Any { // can be "String", "Int", "Float", etc
    println("[peek] \(interestingValue)")
    return interestingValue
}

// let title = peek(window.document.fileURL.lastPathComponent).capitalizedString
// error: 'Any' does not have a member named 'capitalizedString'

// Use of <Generic Type>  to solve that
func peek<T>(interestingValue: T) -> T {
    println("[peek] \(interestingValue)")
    return interestingValue
}

// Type Relationships
func swapTwo<T>(inout x: T, inout y: T) {
    let tmp = x
    x = y
    y = tmp
}

var studentCount = 42
var teacherCount = 7
swapTwo(&studentCount, &teacherCount)
println([studentCount, teacherCount])

// Equatable
func indexOf<T : Equatable>(sought: T, array: [T]) -> Int? {
    for i in 0..<array.count {
        if array[i] == sought {
            return i
        }
    }
    return nil
}

println(indexOf("ab", ["cd", "ac", "ab"]))


// Calculating Fibonacci with memoization
var fibonacciMemo = Dictionary<Int, Double>()

// Return the nth of fibonacci number: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
func fibonacci(n: Int) -> Double {
    if let result = fibonacciMemo[n] {
        return result
    }
    let result = n < 2 ? Double(n) : fibonacci(n - 1) + fibonacci(n - 2)
    fibonacciMemo[n] = result
    
    return result
}

let phi = fibonacci(45) / fibonacci(44)

// Use swift "memoize"
func memoize<T: Hashable, U>( body: ((T)->U, T)->U ) -> (T)->U {
    var memo = Dictionary<T, U>()
    var result: ((T)->U)!
    return { x in
        if let q = memo[x] { return q }
        let r = body(result, x)
        memo[x] = r
        return r
    }
}

/*
let fibonacci2 = memoize {
    fibonacci2, n in
    n < 2 ? Double(n) : fibonacci2(n - 1) + fibonacci2(n - 2)
}

let phi2 = fibonacci2(45) / fibonacci2(44)
*/

let factorial = memoize { factorial, x in x == 0 ? 1 : x * factorial(x - 1) }

