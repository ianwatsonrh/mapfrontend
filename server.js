var http = require('http');
var fs = require('fs');
http.createServer(function (request, response) {

console.log("HOST -> " + process.env.DATAHOST);
console.log("PORT -> " + process.env.DATAPORT);


if (request.url == "/data.json") {

    console.log('request starting...');

	var options = {
	  host: process.env.DATAHOST,
	  port: process.env.DATAPORT,
	  path: process.env.DATAPATH,
	  method: 'GET',
	};

	console.log('here');

	

	var req = http.request(options, function(res) {

		var msg = '';

  		res.setEncoding('utf8');
  		res.on('data', function(chunk) {
  			console.log('collecting');
    		msg += chunk;
  		});
  		res.on('end', function() {
  			console.log('finished');
		    console.log(msg);
		    response.writeHead(200, { 'Content-Type': 'text/html'});
			response.end(msg, 'utf-8');
  		});

	});

	req.write("re");
	req.end();
	
} else {
	fs.readFile('./index.html', function(error, content) {
		if (error) {
			response.writeHead(500);
			response.end();
		}
		else {
			response.writeHead(200, { 'Content-Type': 'text/html' });
			response.end(content, 'utf-8');
		}
	});
}
	
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080');
