# A Browserify Transform for Pug

**Pugify** lets you use [Pug][] templates with [browserify][] in the simplest way possible:

```js
var template = require("./template.pug");

document.getElementById("my-thing").innerHTML = template({
    localVar: "value",
    anotherOne: "another value"
});
```

## Setup

When creating your browserify bundle, just add this line:

```js
bundle.transform(require("pugify"));
```

or if you are a command line cowboy, something along the lines of

```js
browserify -t pugify entry.js -o bundle.js
```

[Pug]: http://jade-lang.com/
[browserify]: https://github.com/substack/node-browserify
