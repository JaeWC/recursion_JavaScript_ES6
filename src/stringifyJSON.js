// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here

  // In case when obj is primitive types
  if (typeof obj === 'string') {
  	return '"' + obj + '"';
  } else if (typeof obj === 'number' || obj === null || typeof obj === 'boolean') {
  	return String(obj);
  }

  // when obj is 'Array'
  if (Array.isArray(obj)) {
  	if (obj.length === 0) {
  		return '[]';
  	}
  	var stringifiedArr = [];
  	for (var i = 0; i < obj.length; i++) {
  		stringifiedArr.push(stringifyJSON(obj[i]));
  	}
  	return '[' + stringifiedArr.join(',') + ']';
  }

  // when obj is 'Object'
  if (Object.keys(obj).length === 0) {
  	return '{}';
  }
  var stringifiedObj = [];
  for (var prop in obj) {
  	if (obj[prop] === undefined || typeof obj[prop] === 'function' || typeof obj[prop] === 'symbol') {
  		delete obj[prop];
      return stringifyJSON(obj);
  	}
  	stringifiedObj.push(stringifyJSON(prop) + ':' + stringifyJSON(obj[prop]));
  }
  return '{' + stringifiedObj.join(',') + '}';
};

if ( typeof module === "object" && typeof module.exports === "object" ) {
  module.exports = stringifyJSON;
}