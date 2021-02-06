const express = require('express'),
    http = require('http'),
    app = express();
// use express static to deliver resources HTML, CSS, JS, etc)
// from the public folder
app.use(express.static('public'));
http.createServer(options, app).listen(3355);
console.log("The HTTP server is up and running");