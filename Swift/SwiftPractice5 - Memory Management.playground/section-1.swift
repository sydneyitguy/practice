// Ownership
class Apartment {
    var tenant: Person?
}
class Person {
    var home: Apartment?
    
    func moveIn(apt: Apartment) {
        self.home = apt
        apt.tenant = self
    }
}

var renters = ["Seb": Person()]
var apts = [507: Apartment()]
renters["Seb"]!.moveIn(apts[507]!)

renters["Seb"] = nil
apts[507] = nil

// result in dangling references "home" and "tenant" are pointing each other

class Apartment2 {
    var tenant: Person2?
}
class Person2 {
    var home: Apartment2?
    
    func moveIn(apt: Apartment2) {
        self.home = apt
        apt.tenant = self
    }
    
    func buzzIn() {
    }
}

var renters2 = ["Seb": Person2()]
var apts2 = [507: Apartment2()]
renters2["Seb"]!.moveIn(apts2[507]!)

renters["Seb"] = nil // "Person2" becomes nil => "Apartment2.tenant" becomes nil
apts[507] = nil // "Apartment2" becomes nil => no dangling references anymore!

// Binding the optional produces a string reference
renters2 = ["Seb": Person2()]
apts2 = [507: Apartment2()]
renters2["Seb"]!.moveIn(apts2[507]!)

if let tenant = apts2[507]!.tenant {
    // tenant becomes strong reference
}

apts2[507]!.tenant?.buzzIn()


// Unowned references
class Owner {
    var card: CreditCard?
}
class CreditCard {
    unowned let holder: Owner
    
    init(holder: Owner) {
        self.holder = holder
    }
}

/**
 Conclusion:
    Strong references - owners to the objects they own (default)
    Weak references - among objects with independent lifetimes
    Unowned references - owned objects with the same "lifetime"
*/

