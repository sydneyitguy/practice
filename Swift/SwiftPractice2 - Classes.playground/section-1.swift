class Vehicle {
    var numberOfWheels = 0
    var description: String {
        return "\(numberOfWheels) wheels"
    }
}

let someVehicle = Vehicle()
println(someVehicle.description)

class Bicycle: Vehicle {
    override init() {
        super.init()
        numberOfWheels = 2
    }
}

let myBicycle = Bicycle()
println(myBicycle.description)

class Car: Vehicle {
    var speed = 0.0
    override init() {
        super.init()
        numberOfWheels = 4
    }
    
    override var description: String {
        return super.description + ", speed: \(speed)"
    }
}

let myCar = Car()
myCar.speed = 35.0
println(myCar.description)

class ParentCar: Car {
    override var speed: Double {
        willSet {
            if newValue > 65.0 {
                println("Careful Now")
            }
        }
    }
}

let parentCar = ParentCar()
parentCar.speed = 100.0