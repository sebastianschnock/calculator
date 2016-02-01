# Calculator
A customizable calculator widget for your web page

# Requirements
- [Babel](http://babeljs.io/)
- [Babelify](https://github.com/babel/babelify)
- [Browserify](http://browserify.org/)

# Install it
Install the prerequisites with:
```
npm install -g babel
npm install -g browserify
npm install -g babelify
```
Then checkout the project:
```
git clone https://github.com/sebastianschnock/calculator.git
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
To add a new button to the calculator you have to add a new operator to ```operators.js``` and add a corresponding DOM element to ```calculator.html```.

# Gotchas
To avoid typical floating point arithmetics phenomenas (eg: 0.1 + 0.2 => 0.30000000000000004) the float precision is fixed to 10 digits (can be configured in ```config.js```). Please don't do rocket science with this calculator!

# Todo
- support for parentheses
- minify
- documentation of format (eg white-spaces)
- error handling for mis-formed expressions
- remove the need for token separation through whitespace
- more tests, with complex expressions
- support insertion of expression directly via keyboard
- html5 polyfills?
- integer overflows? big numbers?
- clear on number when no operator is in front
- decouple symbol on display from formula input