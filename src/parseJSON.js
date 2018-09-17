// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  console.log(json);

  // case of primitives
  if (json[0] === '"') {
    return json.slice(1, json.length - 1);
  } else if (json === 'null') {
    return null;
  } else if (!isNaN(Number(json[json.length - 1]))) {
    return Number(json);
  }
  else if (json === 'true' || json === 'false') {
    if (json === 'true') {
      return true;
    } else {
      return false;
    }
  }

  // case of Array
  if (json[0] === '[' && json[json.length - 1] === ']') {
    if (json.length === 2) {
      return [];
    }

    var parsedArr = [];
    var newStr = json.slice(1, json.length - 1);
    var splittedArr = newStr.split(',');

    for (var i = 0; i < splittedArr.length; i++) {
      parsedArr.push(parseJSON(splittedArr[i].trim()));
    }
    return parsedArr;
  }

  // case of Object
  if (json[0] === '{') {
    if (json.length === 2) {
      return {};
    }

    var parsedObj = {};
    var newJSON = json.slice(1, json.length - 1);
    var splittedObj;

    if (newJSON[newJSON.length - 1] === ']') {
      splittedObj = newJSON.split(':');

      parsedObj[parseJSON(splittedObj[0])] = parseJSON(splittedObj[1]);
      return parsedObj;
    }

    if (newJSON[newJSON.length - 1] === '}') {
      var colonIdx = newJSON.indexOf(':');

      parsedObj[parseJSON(newJSON.slice(0, colonIdx))] = parseJSON(newJSON.slice(colonIdx + 1))

      return parsedObj;
    }


    if (newJSON.indexOf(',') === -1) {
      splittedObj = newJSON.split(':')
      parsedObj[parseJSON(splittedObj[0].trim())] = parseJSON(splittedObj[1].trim());
    } else if (newJSON.indexOf(',') > newJSON.indexOf(':')) {
      splittedObj = newJSON.split(',');

 			for (var i = 0; i < splittedObj.length; i++) {
        var temp = splittedObj[i].split(':');
        parsedObj[parseJSON(temp[0].trim())] = parseJSON(temp[1].trim());
      }
    }
    else if (newJSON.indexOf(',') < newJSON.indexOf(':')) {
    	splittedObj = newJSON.split(', "');

    	for (var i = 0; i < splittedObj.length; i++) {
    		var temp = splittedObj[i].split(':');
    		if (i >= 1) {
    			temp[0] = ('"').concat(temp[0])
    		}
    		parsedObj[parseJSON(temp[0].trim())] = parseJSON(temp[1].trim());
  		}
  	}
  return parsedObj;
  }
};

if ( typeof module === "object" && typeof module.exports === "object" ) {
  module.exports = parseJSON;
}