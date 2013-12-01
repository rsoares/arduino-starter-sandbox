var j5 = require("johnny-five");
var board,
    leds = [],
    num = 0,
    ledPins = [2, 3, 4, 5, 6, 7, 8, 9];

board = new j5.Board();

board.on("ready", function() {

  // Initialize the leds
  for( var i = 0; i < ledPins.length; i++ ) {
    var led = new j5.Led( ledPins[ i ] );
    leds.push( led );
  }

  // Convert decimal to binary
  function binary() {
    var binNum = num.toString( 2 );
    
    console.log( binNum + " (base 2) = " + num + " (base 10)");
    if( num === 256 ) {
      console.log( "Done!" );
      return;
    }
    for( var i = 0; i < binNum.length; i++ ) {
      toggleLed( leds[ i ], binNum[ i ] );
    }
    num++;
  }
  
  function toggleLed( led, value ) {
    value = parseInt( value, 10 );
    if( value ) {
      led.on();
    } else {
      led.off();
    }
  }

  board.loop( 100, binary );
});
