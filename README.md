# Game of Life
> A program that simulates Conway's Game of Life

## Instructions:
1. Install all packages.
```js
npm install
```

2. Update configs at the beginning of `index.js`.

- `THRESHOLD`: the approximate desired proportion of living to dead cells in the initial board *(default = 0.25)*
- `MAX_ITER`: maximum game iterations *(default = 50)*
- `WIDTH`: board width *(default = 100)*
- `HEIGHT`: board height *(default = 100)*
- `GIF_INTERVAL`: interval of time between frames *(default = 20)*
- `OUTPUT_PATH`: path to output GIF file 

3. Run the script.
```js
npm start
```

## Testing
Some unit tests were implemented using the Jest library. To run the tests:
```js
npm test
```

## Game of Life Rules
1. Any live cell with 0 or 1 live neighbors becomes dead, because of underpopulation

2. Any live cell with 2 or 3 live neighbors stays alive, because its neighborhood is just right

3. Any live cell with more than 3 live neighbors becomes dead, because of overpopulation

4. Any dead cell with exactly 3 live neighbors becomes alive, by reproduction

## Example
![game_of_life](game_of_life.gif)

## Credits
Inspired by: Robert Heaton's [Programming Projects For Advanced Beginners](https://robertheaton.com/2018/07/20/project-2-game-of-life/)