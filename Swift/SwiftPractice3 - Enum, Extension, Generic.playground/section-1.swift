// Enum
enum TrainStatus {
    case OnTime, Delayed(Int)
    init() {
        self = OnTime
    }
    
    var description: String {
        switch self {
            case OnTime:
                return "on time"
            case Delayed(let minutes):
                return "delayed by \(minutes) minute(s)"
        }
    }
}

var trainStatus = TrainStatus.Delayed(10)
println(trainStatus.description)

// Extension
extension Int {
    func times(task: () -> ()) {
        for i in 0..<self {
            task()
        }
    }
}

3.times {
    println("Hello!")
}


//Generic

struct Stack<T> {
    var elements = [T]()
    
    mutating func push(element: T) {
        elements.append(element)
    }
    
    mutating func pop() -> T {
        return elements.removeLast()
    }
}

var intStack = Stack<Int>()
intStack.push(50)
println(intStack.pop())

