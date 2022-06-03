# 2048

This is my clone of the game 2048 just with different styles than the original game. For those that don't know what the game of 2048 is here is a overview of how it's played.

2048 is played on a plain 4×4 grid, with numbered tiles that slide when a player moves them using the four arrow keys. Every turn, a new tile randomly appears in an empty spot on the board with a value of either 2 or 4. Tiles slide as far as possible in the chosen direction until they are stopped by either another tile or the edge of the grid. If two tiles of the same number collide while moving, they will merge into a tile with the total value of the two tiles that collided. The resulting tile cannot merge with another tile again in the same move.

If a move causes three consecutive tiles of the same value to slide together, only the two tiles farthest along the direction of motion will combine. If all four spaces in a row or column are filled with tiles of the same value, a move parallel to that row/column will combine the first two and last two. The user's score starts at zero, and is increased whenever two tiles combine, by the value of the new tile.

The game is won when a tile with a value of 2048 appears on the board. Players can continue beyond that to reach higher scores. When the player has no legal moves (there are no empty spaces and no adjacent tiles with the same value), the game ends.

## Technology

- HTML
- CSS
- JS
- Express
- Cors
- Axios
- Nodemon

## Screenshots

![Main Screen](/screenshots/2022-06-02.png?raw=true)

![Game Board Loaded](/screenshots/2022-06-01.png?raw=true)
