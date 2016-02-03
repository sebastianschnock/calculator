# Calculator
A customizable calculator app in 80ies beach style flavor.

# Showcase
http://sebastianschnock.github.io/calculator/

# Install it
Checkout the project:
```
git clone https://github.com/sebastianschnock/calculator.git
```
Install the dependencies (inside of the project directory):
```
npm install
```

# Build it
Inside the project directory:
```
npm run build
```
The output is in the ```dist``` folder.

# Run it
```
npm run start
```
Then point your browser to http://127.0.0.1:3000

# Test it
```
npm run test
```

# Adding functionality (operators)
To add a new button to the calculator you have to add a new operator to ```operators.js``` and add a corresponding DOM element to ```index.html```.

As an example we add the modulo operator to the calculator. Add this line to the operators in ```index.html```:
```
<button class='calc__opr calc__opr--exp' data-calc-input=' % '>%</button>
```
And add this block to ```operators.js```:
```
    {
        symbol: '%',
        precedence: 3,
        leftAssociative: true,
        numOperands: 2,
        evaluate: (x, y) => x % y
    }
```
That's it.
This would be the operator definition for square root:
```
    {
        symbol: '√',
        precedence: 5,
        leftAssociative: false,
        numOperands: 1,
        evaluate: (x) => Math.sqrt(x)
    }
```

# Gotchas
To avoid typical floating point arithmetics phenomenas (eg: 0.1 + 0.2 => 0.30000000000000004) the float precision is fixed to 10 digits (can be configured in ```config.js```). Please don't do rocket science with this calculator!

# Todo
- keyboard input
- support for parentheses
- better error handling and input validation