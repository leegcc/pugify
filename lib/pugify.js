"use strict";

var through = require("through");
var pug = require("pug");

module.exports = function (fileName, options) {
  if (!/\.pug$/i.test(fileName)) {
    return through();
  }

  var inputString = "";
  return through(
    function (chunk) {
      inputString += chunk;
    },
    function () {
      var self = this;

      options.filename = fileName;
      options.inlineRuntimeFunctions = false;
      options.compileDebug = options.compileDebug === true;

      var result;
      try {
        result = pug.compileClientWithDependenciesTracked(inputString, options);
      } catch (e) {
        self.emit("error", e);
        return;
      }

      result.dependencies.forEach(function (dep) {
        self.emit("file", dep);
      });

      var moduleBody = "var pug = require(\"pug-runtime\");\n\n" +
        "module.exports = " + result.body + ";";

      self.queue(moduleBody);
      self.queue(null);
    }
  );
};
