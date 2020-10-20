
  LevenshteinDistance =  function(a, b){
    if(a.length == 0) return b.length; 
    if(b.length == 0) return a.length; 

    var matrix = [];

    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) == a.charAt(j-1)){
            matrix[i][j] = matrix[i-1][j-1];
        } else {
            matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                    Math.min(matrix[i][j-1] + 1, // insertion
                                            matrix[i-1][j] + 1)); // deletion
        }
        }
    }

return matrix[b.length][a.length];
};



var quotes = require("./quotes.json");

for (var i = 0; i < quotes.length; ++i) {
  for (var j = 0; j < quotes.length; ++j) {
    if (i !== j){//} && quotes[i].text === quotes[j].text) {
      var dist = LevenshteinDistance(quotes[i].text, quotes[j].text);
      if (dist < 10)
      {
        console.log("double detected, rows " + (i+2) + " and " + (j+2) + ", '" + quotes[i].text + "'");
      }
    }
  }
}

