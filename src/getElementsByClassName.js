// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
  // your code here
  var bodyElement = document.body;
  var classElement = [];

  function findClassName(element) {


  	if (element.classList && element.classList.contains(className)) {
  		classElement.push(element);
  	}

  	if (element.hasChildNodes()) {
  		var children = element.childNodes;
  		for (var i = 0; i < children.length; i++) {
  			findClassName(children[i]);
  		}
  	}
  }

  findClassName(bodyElement);

  return classElement;
};

if ( typeof module === "object" && typeof module.exports === "object" ) {
  module.exports = getElementsByClassName;
}