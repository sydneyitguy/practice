// Initializers

// Every value must be initialized before it is used
var message: String // can't be nil because String is not an Optional Type
// println(message) => compile error

// Structure Initialization

struct Color {
    let red, green, blue: Double
    
    mutating func validateColor() {
        
    }

    init(grayScale: Double) {
        red = grayScale
        green = grayScale
        // validateColor() // cannot call this because Class hasn't been initalized
        blue = grayScale
        validateColor()
    }
}

class Car {
    var paintColor: Color
    init(color: Color) {
        paintColor = color
    }
}

class RaceCar: Car {
    var hasTurbo: Bool
    init(color: Color, turbo: Bool) {
        hasTurbo = turbo
        super.init(color: color) // Should be called at last for memory safety (after finish self initialization)
        // otherwise, "hasTurbo" may not be initalized at the point of executing super.init() function
    }
    
    convenience init(color: Double) {
        self.init(color: Color(grayScale: color), turbo: true)
    }
    
    convenience init() {
        self.init(color: Color(grayScale: 0.4), turbo: true)
    }
}
var car = RaceCar(color: 0.4)


class FormulaOne: RaceCar {
    let minimumWeight = 642
    
    init(color: Color) { // designated initializer
        super.init(color: color, turbo: false)
    }
}


class Player {}
class MultiplayerManager {
    func addPlayer(player: Player) {}
}
// Lazy Properties
class Game {
    lazy var multiplayerManager = MultiplayerManager() // Initialized when it's called (only once)
    var singlePlayer: Player?
    
    func beginGameWithPlayers(players: Player...) {
        if players.count == 1 {
            singlePlayer = players[0]
        } else {
            for player in players {
                multiplayerManager.addPlayer(player)
            }
        }
    }
}




