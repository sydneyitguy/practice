// Closures
var clients = ["Pestov", "Buenaventura", "Sreeram", "Babbage"]

clients.sort({(a: String, b: String) -> Bool in
    return a < b
})

// =>
clients.sort({a, b in a < b})

// =>
clients.sort { $0 < $1 }


// Functional Programming
import Foundation
var words = ["hungry", "angry", "whatever"]
println(words.filter { $0.hasSuffix("gry") }
             .map { $0.uppercaseString }
             .reduce("HULK") { "\($0) \($1)" } + "!!!")


// Ownership of Captures
class TemperatureNotifier {
    var onChange: (Int) -> Void = { x in }
    var currentTemp = 72
    
    init() {
        onChange = {[unowned self] temp in // Prevent cycle reference => no memory leaks
            self.currentTemp = temp
        }
    }
}

// Pattern Matching
/* Enumeration
switch trainStatus {
    case .OnTime:
        println("on time")
    
    case .Delayed(1):
        println("nearly on time")
    
    case .Delayed(2...10):
        println("almost on time, I swear")

    case .Delayed(_): // wildcard pattern
        println("it'll get  here when it's ready")
}
*/

/* Type Patterns
func tuneUp(car: Car) {
    switch car {
        case let formulaOne as FormulaOne:
            formulaOne.enterPit()
        case let raceCar as RaceCar:
            if raceCar.hasTurbo {raceCar.tuneTurbo() }
            fallthrough // no implicit fallthrough by default
        default:
            car.checkOil()
            car.pumpTires()
    }
}
*/

// Tuple Patterns
let color = (1.0, 1.0, 1.0, 1.0)
switch color {
    case (0.0, 0.5...1.0, let blue, _):
        println("Green and \(blue * 100)% blue")
    
    case let (r, g, b, 1.0) where r == g && g == b:
        println("Opaque grey \(r*100)%")

    default:
        println("whatever")
}

// Pattern Matching Together!
/*
func stateFromPlist(list: Dictionary<String, AnyObject>) -> State? {
    switch(list["name"], list["population"], list["abbr"]) {
        case(.Some(let listName as NSString),
             .Some(let pop as NSNumber),
            .Some(let abbr as NSString)) where abbr.length == 2:
            return State(name: listName, population: pop, abbr: abbr)

        default:
            return nil
    }
}
*/




 