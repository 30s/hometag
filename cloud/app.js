
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
    query.descending('createdAt');
    query.find({
        success: function(results) {
            var ctx = { mac: req.query.mac, data: results };
            results.reverse();
            // res.send(ctx);
            res.render('data', ctx);
        },
        error: function(error) {
            res.send(error);
        }
    });
});

app.get('/screen', function(req, res) {
    var ScreenUsage = Parse.Object.extend("ScreenUsage");
    var query = new Parse.Query(ScreenUsage);
    query.descending('ts');
    var date = new Date();
    date.setDate(date.getDate() - 1);
    query.greaterThan('ts', date.getTime());
    query.limit(1000);
    query.find({
        success: function(results) {
            var ctx = {data: results};
            results.reverse();
            res.render('screen', ctx);
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
