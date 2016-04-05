/*
Creates a grid of squared divs, that can be filled with color on mouseenter.
Also creates a button which resets the fill and asks for new grid width.
*/

var container = document.getElementById('container');
var row = document.createElement('div');
var pix = 8 ; // number of tiles by default
var num;
createButton(1);
createButton(2);
createButton(3);
createTile(pix); // tile with pixels by default
paint3(); // applying painting method by default

// creating a grid
function createTile(tiles) {
  // deletes existing rows
  $(".row").remove();
  row.className = 'row';
  container.insertBefore(row, null);
  // creating row's elements
  $(".tile").remove();
  for (var i = 0; i < tiles; i++) {
    var div = document.createElement('div');
    div.className = "tile";
    row.insertBefore(div, row.lastSibling);
  }
  // creating rows
  for (var k = 0; k < (tiles-1); k++) {
    var div2 = row.cloneNode(true);
    container.insertBefore(div2, container.lastSibling);
  }
  // sizing divs
  var tileWidth = 960/tiles;
  var tileHeight = tileWidth;
  $('.row').height(tileHeight);
  $('.tile').width(tileWidth).height(tileHeight);
}

function paint1() {
  // painting tiles with css rule by assigning class
  $('.tile').on('mouseenter', function() {
    $(this).addClass('selected');
  });
}

function paint2() {
  // painting tiles with random colors
  $('.tile').on('mouseenter', function() {
    $(this).css("background-color", function(){
      var hueRgb = "rgb("+randomRgb()+","+
        randomRgb()+","+randomRgb()+")";
      return hueRgb;
    });
  });
}

function paint3() {
  // painting tiles if still not painted
  $('.tile').on('mouseenter', function() {
      // checking whether tile painted or not
      if (($(this).css("background-color")) === "rgb(128, 128, 128)") {
        // if not painted, color it with random hue and lightness and 100% brightness
        $(this).css("background-color", function(){
          var hueHsl = "hsl("+randomHsl()+", 100%, "+ randomHsl()+"%)";
          return hueHsl;
        });

      } else {
          // if already painted, on each mouseenter decrease lightness by 10%
          var rgb = this.style.backgroundColor.split(/\(|\)/); // get current rgb background color
          rgb = rgb[1].split(','); // split to array
          var toHsl = rgbToHsl(rgb[0], rgb[1], rgb[2]); // convert to hsl
          $(this).css("background-color", function(){
            // set the same hsl as it was, but decrease lightness by 10%
            var newHsl = "hsl(" + (toHsl[0]) + ",100%," + (toHsl[2]*80) + "%)";
            return newHsl;
          });
      }
  });
}

function randomHsl(){
  return Math.floor(Math.random()*100);
}

function randomRgb(){
  return Math.floor(Math.random()*256);
}

function rgbToHsl(r, g, b) {
  // found here http://stackoverflow.com/a/23502424/6161274
      r /= 255, g /= 255, b /= 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if(max == min){
          h = s = 0; // achromatic
      } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch(max){
              case r: h = (g - b) / d ; break;
              case g: h = 2 + ( (b - r) / d); break;
              case b: h = 4 + ( (r - g) / d); break;
          }
          h*=60;
          if (h < 0) h +=360;
      }
     return([h, s, l]);
  }

function createButton(num) {
  // creating a button
  var button = document.createElement('button');
  button.id = "btn"+num;
  button.name = "button";
  container.insertBefore(button, container.append);
  button.innerHTML = num+" Reset";
  // Asking for grid size
  $('#btn'+num).on('click', function(){
    pix = prompt('How many pixels do you want?');
    // Create grid
    createTile(pix);
    // assigning paint method for button
    whichPaint['paint'+num](); // calling a choosen paint method
  });
}

var whichPaint = { // object to use paint function names as a variable
  paint1: paint1,
  paint2: paint2,
  paint3: paint3
};
