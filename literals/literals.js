var labels = require('./labels').labels;

function getLabel(key) {
  return labels[key];
}

function sprintf(key, params) {
  var result = "";
  var s = labels[key];
  if (s) {
    result = replaceString(s, params);
  }
  return result;
}

function replaceString(s, a) {
  for (var i = 0; i < a.length; i++) {
    s = s.replace("%" + (i + 1), a[i]);
  }
  return s;
}

exports.getLabel = getLabel;
exports.sprintf = sprintf;