var quotes = require("./quotes.json");

for (var i = 0; i < quotes.length; ++i) {
  for (var j = 0; j < quotes.length; ++j) {
    if (i !== j && quotes[i].text === quotes[j].text) {
      console.log("double detected, rows " + (i+2) + " and " + (j+2) + ", '" + quotes[i].text + "'");
    }
  }
}