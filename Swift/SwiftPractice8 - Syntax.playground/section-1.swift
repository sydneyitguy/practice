// Use "_" to make something anonymous

/*
var red, blue: Int
(red, _, blue, _) = color.rgba
*/

// Removing Argument Names
class Thing {
    weak var location: Thing?
    var name: String
    var longDescription: String

    // can call init function without argument names (using positions)
    init(_ location: Thing?, _ name: String, _ longDescription: String) {
        self.location = location
        self.name = name
        self.longDescription = longDescription
    }
}

// Protocols
protocol Pullable {
    func pull()
}

let westOfHouse = Thing(nil, "root", "West of house")
let wallWestOfHouse = Thing(westOfHouse, "wall", "The plaster has crumbled away, leaving the wood beneath to rot")
let pathWestOfHouse = Thing(westOfHouse, "path", "An overgrown path leads south around the corner of the house")


class Boards: Thing, Pullable {
    func pull() {
        if location === wallWestOfHouse {
            println("They come off with litte effort")
            location = westOfHouse
        } else {
                println("Thing of the splinters!")
        }
    }
}

func performPull(object: Thing) {
    if let pullableObject = object as Pullable {
        pullableObject.pull()
    } else {
        println("You aren't sure how to print a \(an ~ object)") // See printable protocol and extension follow:
    }
}

// Special Protocols
/*
LogicValue                      if logicValue {
Printable                       "\(printable)"
Sequence                        for x in sequence
IntegerLiteralConvertible       65536
FloatLiteralConvertible         1.0
StringLiteralConvertible        "abc"
ArrayLiteralConvertible         [ a, b, c ]
DictionaryLiteralConvertible    [ a: x, b: y ]
*/

// Printable
protocol printable {
    var description: String { get }
}
extension Thing: Printable {
    var description: String { return name }
}

// Decorating a printed string

// Overloading an binary operator
operator infix ~ {}
func ~ (decorator: ???, object: Thing) -> String {
    
}
func an(object: Thing) -> String {
    return object.nameWithArticle
}

// Subscripts
extension Place {
    subscript(direction: Direction) -> Place? {
        get {
            return exits[direction]
        }
        set(destination: Place?) {
            exits[direction] = destination
        }
    }
}


let westOfHouse = Place("West of House", "..", "..)
// that way instead of 
westOfHouse.exits[.South] = gardenPath
// becomes
westOfHouse[.South] = gardenPath



/* <A word of Caution>
    - Keep it natural
    - Work by analogy (careful with subscript overuse)
    - New idions should pay for themselves
*/


