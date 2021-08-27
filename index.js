const THRESHOLD = 0.3
const MAX_ITER = 100

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

async function run_game_of_life(width, height) {
    board = random_state(width,height)
    render(board)
    for(var i = 0; i < MAX_ITER; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        board = next_board_state(board)
        render(board)
    }
} 

run_game_of_life(10, 10)

module.exports = { next_board_state };