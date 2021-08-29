const { run_game_of_life, load_board_state, random_state } = require('./game_of_life.js');
const fs = require('fs')
var Gm = require("gm");

// Configs for GIF generation
const MAX_ITER = 10
const GIF_INTERVAL = 20
const OUTPUT_PATH = "game_of_life.gif"

// Configs for loaded board
const BOARD_PATH = ""

// Configs for random board
const THRESHOLD = 0.25
const WIDTH = 100
const HEIGHT = 100

if (BOARD_PATH != "") board = load_board_state(BOARD_PATH) 
else board = random_state(WIDTH,HEIGHT,THRESHOLD)

run_game_of_life(board, MAX_ITER, GIF_INTERVAL).then( () => {
    var gm = Gm()
    for(var i = 0; i <= MAX_ITER; i++) {
        gm.in(`img/image${i}.png`)   
    }
    
    gm.delay(GIF_INTERVAL)
    .write(OUTPUT_PATH, function(err){
      if (err) throw err;
      console.log("game_of_life.gif created");
      for(var i = 0; i <= MAX_ITER; i++) {
          fs.unlinkSync(`img/image${i}.png`)
      }
    });
})

