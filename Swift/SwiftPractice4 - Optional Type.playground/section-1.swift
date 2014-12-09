//Optional Type

var optionalNumber: Int? // default initialized to nil

//var myString: String = nil -> Non-optional types can't be nil

func findIndexOfString(string: String, array: [String]) -> Int? {
    for (index, value) in enumerate(array) {
        if value == string {
            return index
        }
    }
    
    return nil
}

var neighbors = ["Alex", "Anna", "Madison", "Dave"]
let index = findIndexOfString("Madison", neighbors)

println(neighbors[index!]) // forced-unwrapping operator

// correct way
if let indexValue = index {
    println(neighbors[indexValue])
} else {
    println("Mus've moved away")
}

// short term
if let index = findIndexOfString("Madison", neighbors) {
    println(neighbors[index])
} else {
    println("Mus've moved away")
}


// Optional Chaning
class Address {
    var buildingNumber: String?
    var streetName: String?
    var apartmentNumber: String?
}
class Residence {
    var address: Address?
}
class Person {
    var residence: Residence?
}

let paul = Person()
var addressNumber: Int?

if let home = paul.residence {
    if let postalAddress = home.address {
        if let building = postalAddress.buildingNumber {
            if let convertedNumber = building.toInt() {
                addressNumber = convertedNumber
            }
        }
    }
}

// equals to
addressNumber = paul.residence?.address?.buildingNumber?.toInt() // simply nil if any of them do not present








