# calculator
A customizable calculator widget for your web page

# Requirements
- [Babel](http://babeljs.io/)
- [Babelify](https://github.com/babel/babelify)
- [Browserify](http://browserify.org/)

# Installation
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

# Build the library
Inside the project directory:
```
npm run build
```

# Testing
```
npm run test
```

# Gotchas
Since the calculator works with common floats, typical floating point arithmetics phenomenas can be expected, eg: 0.1 + 0.2 => 0.30000000000000004

# Todo
- support for parentheses
- minify
- js doc
- documentation of format (eg white-spaces)
- error handling for mis-formed expressions
- remove the need for token separation through whitespace
- more tests, with complex expressions
- support insertion of expression directly via keyboard
- html5 polyfills?
- integer overflows? big numbers?
- clear on number when no operator is in front