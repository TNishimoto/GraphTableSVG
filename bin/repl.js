const GraphTableSVG = require("../dist/nodejs_index");
const replServer = require('repl').start('>>> ').context.GraphTableSVG = GraphTableSVG;
console.log("hellowordld")
    //replServer.context.User = User