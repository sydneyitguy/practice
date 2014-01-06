LookupTable = (function() {
  var _activeWords, _equivClasses, _wordLength, _leftChance, _prevOutput, _history;

  // Build a hash map of active words using equivalent classes
  //  - e.g. { 'A___': ['AVID', 'AVIS', ..], '_A__' : ['BASE', 'CASE', ..]}
  //  - Running time: O(n)
  //  - Space: O(n)
  var _buildMap = function(letter) {
    _equivClasses = {};
    console.log(_activeWords.length + ' possible words left');

    // Iterate through all active words, putting words into a map with the key of equivalent value
    for(var i = 0; i < _activeWords.length; i++) {
      var key = _activeWords[i].replace((new RegExp('[^' + letter + ']',"gi")), '_');

      if(typeof _equivClasses[key] === 'undefined') {
        _equivClasses[key] = [_activeWords[i]];
      } else {
        _equivClasses[key].push(_activeWords[i]);
      }
    }
  };

  // Assume the optimal selection for the next round is the set with most words
  var _getKeyOfLargestSet = function() {
    var maxLength = 0
      , theKey = 0;

    for(var key in _equivClasses) {
      if(_equivClasses[key].length > maxLength) {
        maxLength = _equivClasses[key].length;
        theKey = key;
      }
    }

    return theKey;
  };

  // Get curretn progress of world completion by merge the key with previous output
  //  - e.g. __A_ + B___ = B_A_
  var _getProgress = function(key) {
    if(_prevOutput === null) {
      _prevOutput = key;
    } else {
      for(var i = 0; i < key.length; i++) {
        if(key[i] !== '_') {
          _prevOutput = _prevOutput.substr(0, i) + key[i] + _prevOutput.substr(i + 1);
        }
      }
    }

    return _prevOutput;
  }

  return {
    init: function(wordLength, maxGuess) {
      _activeWords = [];
      _wordLength = wordLength;
      _leftChance = maxGuess;
      _prevOutput = null;
      _history = [];

      if(window.wordsList.length > 0) {
        for(var i = 0; i < window.wordsList.length; i++) {
          if(window.wordsList[i].length === wordLength) {
            _activeWords.push(window.wordsList[i]);
          }
        }
      } else {
        console.log('No words list given');
      }
    },

    // Cheat user by selecting the largest possible set of words
    playALetter: function(letter) {
      letter = letter.toUpperCase();

      if(!/^[A-Z]$/.test(letter)) {
        return '#INVALID';
      } else if(_history.indexOf(letter) !== -1) {
        return '#USED';
      } else {
        _history.push(letter);

        _buildMap(letter); // Build hashmap of equivalant classes

        var key = _getKeyOfLargestSet(letter);
        var progress = _getProgress(key);

        _activeWords = _equivClasses[key]; // Set activeWords with the optimal set

        console.log(_equivClasses);

        if(progress.indexOf('_') === -1) {
          return '#WON';
        } else if (--_leftChance == 0) {
          return '#LOST';
        }

        return progress;
      }
    },

    getPrevOutput: function() {
      return _prevOutput;
    },

    getLeftChance: function() {
      return _leftChance;
    },

    getHistory: function() {
      return _history.toString().replace(/,/g, ', ');
    }
  };
})();