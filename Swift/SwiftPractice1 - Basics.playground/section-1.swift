println("Hello, Swift")

let languageName = "Swift"
var version = 1.0
let introduced: Int = 2014
let isAwesome = true

let someString = "I appear to be a string"

for character in "mouse" {
    print(character)
}
println()

let a = 3, b = 5

let mathResult = "\(a) times \(b) is \(a * b)"


var names = ["Anna", "Alex"]
names.append("Sebastian")
println(names[2])
names[1...2] = ["Seb", "Dick"]
println(names)

var numberOfLegs = ["ant": 6, "snake": 0, "cheetah": 4]
numberOfLegs["spider"] = 273
numberOfLegs["spider"] = 8
println(numberOfLegs)


if let possibleLegCount = numberOfLegs["aardvark"] {
    println("An aardvard has \(possibleLegCount)")
}

for number in 1...5 {
    println(number)
}


func sayHello(name: String) {
    println("Hello \(name)")
}
sayHello("SEB")

// Touples
(404, "Not found")
(2, "banana", 0.72)

func refreshWebPage() -> (code: Int, msg: String) {
    return (200, "OK")
}
let (statusCode, message) = refreshWebPage()
statusCode

let status = refreshWebPage()
status.code

// Closure
func repeat(count: Int, task: () -> ()) {
    for i in 0..<count {
        task()
    }
}
repeat(2) {
    println("repeat")
}





