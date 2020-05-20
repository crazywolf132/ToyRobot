# Toy Robot

This is my attempt at the below Toy Robot coding challenge.

I have made a few modifications to make this work. Here is what they are.

1. Instead of using .Net, I used Node.JS ES6 Standard.
2. In the docs for the `PLACE` command, it states that the origin (0,0) would be in the South, West corner (bottom left)... This is not actually the case. (0, 0) is actually in the North West corner (top right).
3. The input does not have to be UPPERCASE, instead it can be lower case.
4. Running the `REPORT` command will exit the game too.

Apart from that, everything else is exactly what is asked for.

## Getting started

This project uses `NPM` or `YARN`, it is up to you. I will provide commands for both.

### Generating the project.

NPM

```bash
    npm i
```

YARN

```bash
    yarn
```

### Starting the game

NPM

```bash
    npm start
```

```bash
    yarn start
```

### Starting unit tests

NPM

```bash
    npm run test
```

YARN

```bash
    yarn test
```

## Examples

```
PLACE 2,2,WEST
MOVE
MOVE
LEFT
MOVE
LEFT
MOVE
REPORT
Output: 3,1,EAST
```

```
PLACE 1,4,EAST
MOVE
MOVE
RIGHT
MOVE
REPORT
Output: 2,4,SOUTH
```

```
PLACE 4,4,NORTH
MOVE
MOVE
left
MOVE
MOVE
LEFT
MOVE
RIGHT
MOVE
MOVE
MOVE
REPORT
Output: 3,0,WEST
```

## File Structure

The file structure to this project is fairly simple.

There is the `utils` folder and the `test` folder, alongside the `app.js` file.

-   **_utils_** :
    This folder contains the core logic to the Game. Each file has a specific purpose. `map.js` Contains all the logic todo with the map. Eg. Moving the robot around the map, Generating the map, and validating moves.
    `errors.js` contains all the predefined error messages.
    Finally, `commands.js` has each of the functions to handle each of the commands. Eg, `PLACE()` `MOVE()` etc.

-   **_tests_** :
    This folder is home to the unit tests. Pretty self-explanatory.

---

# ORIGINAL TASK MD

## Toy Robot Coding Exercise

The application is a simulation of a toy robot moving on a square table top, of dimensions 5 units x 5 units. There are no
other obstructions on the table surface. The robot is free to roam around the surface of the table, but must be prevented
from falling to destruction. Any movement that would result in the robot falling from the table must be prevented,
however further valid movement commands must still be allowed.

Create a console application that can read in commands of the following form -

-   PLACE X,Y,F
-   MOVE
-   LEFT
-   RIGHT
-   REPORT

_PLACE_ will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST. The origin (0,0)
can be considered to be the SOUTH WEST most corner. It is required that the first command to the robot is a PLACE
command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The
application should discard all commands in the sequence until a valid PLACE command has been executed.

_MOVE_ will move the toy robot one unit forward in the direction it is currently facing.

_LEFT_ and _RIGHT_ will rotate the robot 90 degrees in the specified direction without changing the position of the robot.

_REPORT_ will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.

### Constraints

-   Write this application as a Console Application in .NET (Framework or Core) and submit it to a public repository OR send us an archive of the solution including the `.git` folder.
-   Include a README.md with instructions for running the application and unit tests.
-   A robot that is not on the table must ignore the MOVE, LEFT, RIGHT and REPORT commands.
-   Commands will be input via the console.
-   Provide test data to test the application.
-   It is not required to provide any graphical output showing the movement of the toy robot.
-   The toy robot must not fall off the table during movement. This also includes the initial placement of the toy robot. Any
    move that would cause the robot to fall must be ignored.
-   _The application should be extensible and built using modern best practices_

### Examples

```
PLACE 0,0,NORTH
MOVE
REPORT
Output: 0,0,NORTH
```

```
PLACE 0,0,NORTH
LEFT
REPORT
Output: 0,0,WEST
```

```
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT
Output: 0,4,NORTH
```
