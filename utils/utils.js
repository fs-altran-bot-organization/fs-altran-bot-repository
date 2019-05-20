const config = require('../config/constants');

// Dinamic text
function replaceData(string, attrs) {
  var result = "";
  if (string) {
    for (var attr in attrs) {
      string = string.replace("{$" + attr + "}", attrs[attr]);
    }
    result = string;
  }
  return result;
}
exports.replaceData = replaceData;

// Match intents NLP
function match(intents) {
  var minScore = config.luis.minScore;
  intents.sort(sortIntentsByScore);
  var intent = intents[0];
  if (intent && intent.score > minScore) {
    return intent;
  }
  return null;
}

function sortIntentsByScore(a, b) {
  var scoreA = a.score;
  var scoreB = b.score;
  return scoreB - scoreA;
}
exports.match = match;