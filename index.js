const fs = require('fs')
const { createCanvas } = require('canvas')
var Gm = require("gm");

const THRESHOLD = 0.25
const MAX_ITER = 50
const WIDTH = 100
const HEIGHT = 100
const GIF_INTERVAL = 20
const OUTPUT_PATH = "game_of_life.gif"

function dead_state(width, height) {
    var board = [...new Array(height)].map(() => [...new Array(width)].map(() => 0))
    return board
}

function random_state(width, height) {
    var board = [...new Array(height)].map(() => [...new Array(width)].map(() => {
        random_number = Math.random()
        if(random_number >= THRESHOLD) return 0
        return 1
    }))
    return board
}

function pretty_lines(line) {
    line = line.map(state => {
        if(state == 1) return "#"
        return " "
    }).join("")
    line = "|" + line + "|"
    return line
}

function render(board) {
    var divider = "-".repeat(board[0].length + 2)
    var board_string = divider + "\n" + board.map((line) => pretty_lines(line)).join("\n")
    board_string += "\n" + divider
    console.log(board_string)
    return board_string
}

function next_cell_state(board, i, j) {
    current_cell = board[i][j]
    width = board[0].length
    height = board.length

    n_alive = 0
    if((i-1) >= 0 && (j-1) >= 0) n_alive += board[i-1][j-1]
    if((i-1) >= 0) n_alive += board[i-1][j]
    if((i-1) >= 0 && (j+1) < width) n_alive += board[i-1][j+1]
    
    if((j-1) >= 0) n_alive += board[i][j-1]
    if((j+1) < width) n_alive += board[i][j+1]
    
    if((i+1) < height && (j-1) >= 0) n_alive += board[i+1][j-1]
    if((i+1) < height) n_alive += board[i+1][j]
    if((i+1) < height && (j+1) < width) n_alive += board[i+1][j+1]

    if(current_cell == 0 && n_alive == 3) return 1
    if(current_cell == 1 && (n_alive == 2 || n_alive == 3)) return 1
    return 0
}

function next_board_state(board) {
    var new_board = dead_state(board[0].length, board.length)
    for(var i = 0; i < board.length; i++) {
        for(var j = 0; j < board[0].length; j++) {
            new_board[i][j] = next_cell_state(board, i, j)
        }
    }
    return new_board
}

var count = 0

function draw_to_image(string_board) {
    const canvas = createCanvas(WIDTH*10, HEIGHT*12)
    const context = canvas.getContext('2d')
    
    context.fillStyle = '#000'
    context.fillRect(0, 0, WIDTH*10, HEIGHT*12)
    
    context.font = 'bold 10pt DejaVuSansMono'
    context.fillStyle = '#fff'
    context.textAlign = "center"
    context.fillText(string_board, WIDTH*5, 0)

    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(`img/image${count}.png`, buffer)
    count += 1
}

async function run_game_of_life(width, height) {
    board = random_state(width,height)
    draw_to_image(render(board))
    for(var i = 0; i < MAX_ITER; i++) {
        await new Promise(resolve => setTimeout(resolve, GIF_INTERVAL));
        board = next_board_state(board)
        draw_to_image(render(board))
    }
} 

run_game_of_life(WIDTH, HEIGHT).then( () => {
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


module.exports = { next_board_state };