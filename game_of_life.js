
const { createCanvas } = require('canvas')
const fs = require('fs')

function dead_state(width, height) {
    var board = [...new Array(height)].map(() => [...new Array(width)].map(() => 0))
    return board
}

function random_state(width, height, threshold) {
    var board = [...new Array(height)].map(() => [...new Array(width)].map(() => {
        random_number = Math.random()
        if(random_number >= threshold) return 0
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


function draw_to_image(board, count) {
    font_size = 8
    string_board = render(board)
    var ctx = createCanvas(1000, 1000).getContext('2d')
    ctx.font = `bold ${font_size}pt DejaVuSansMono`
    let metrics = ctx.measureText(string_board);
    let fontHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxAscent;
    
    canvas_width = metrics.width*1.2
    canvas_height =fontHeight*board[0].length*1.2

    const canvas = createCanvas(canvas_width, canvas_height)
    const context = canvas.getContext('2d')
    
    context.fillStyle = '#000'
    context.fillRect(0, 0, canvas_width, canvas_height)
    
    context.font = `bold ${font_size}pt DejaVuSansMono`
    context.fillStyle = '#fff'
    context.textAlign = "center"

    context.fillText(string_board, canvas_width/2, 0)

    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(`img/image${count}.png`, buffer)
    count += 1
}

function load_board_state(file_path) {
    try {  
        var board = fs.readFileSync(file_path, 'utf8');
        board = board.split(/\r?\n/).map(line => line.split('').map(val => parseInt(val)))
        return board
    } catch(e) {
        console.log('Error:', e.stack);
    }
    return
}

async function run_game_of_life(board, max_iter, interval) {
    var count = 0
    draw_to_image(board, count)
    count += 1 
    for(var i = 0; i < max_iter; i++) {
        await new Promise(resolve => setTimeout(resolve, interval));
        board = next_board_state(board)
        draw_to_image(board, count)
        count += 1 
    }
} 

module.exports = { run_game_of_life, load_board_state, random_state };