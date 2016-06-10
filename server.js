var http = require('http');
var fs = require('fs');
http.createServer(function (request, response) {

if (request.url == "/data.json") {

    console.log('request starting...');

	var options = {
	  host: 'google.com',
	  port: '80',
	  path: '/',
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json; charset=utf-8'
	  }
	};

	var req = http.request(options, function(res) {
  		var msg = '';

  		res.setEncoding('utf8');
  		res.on('data', function(chunk) {
    		msg += chunk;
  		});
  		res.on('end', function() {
		    console.log(msg);
  		});
	});

	req.write("re");
	req.end();
	response.writeHead(200, { 'Content-Type': 'text/html'});
	response.end("{test:hello}", 'utf-8');
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
