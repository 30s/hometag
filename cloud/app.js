
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

app.get('/data', function(req, res) {
    var bleTH = Parse.Object.extend("bleTH");
    var query = new Parse.Query(bleTH);
    query.equalTo("mac", req.query.mac);
    query.find({
        success: function(results) {
            var ctx = { mac: req.query.mac, data: results };
            // res.send(ctx);
            res.render('data', ctx);
        },
        error: function(error) {
            res.send(error);
        }
    });
});

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();
