// Exercise 1: Simple Node.js HTTP Web Server
// Demonstrates HTTP request handling without any external frameworks

// Step 1: Import the built-in http module using require()
const http = require('http');

// Step 2: Define the port on which the server will listen
const PORT = 3000;

// Step 3: Create the server using createServer()
// The callback receives 'req' (request) and 'res' (response) objects
const server = http.createServer((req, res) => {

    // Log every incoming request to the console
    console.log(`[${new Date().toISOString()}] Incoming Request:`);
    console.log(`  Method : ${req.method}`);
    console.log(`  URL    : ${req.url}`);
    console.log('--------------------------------------------------');

    // Step 4: Route handling based on the requested URL
    if (req.url === '/' && req.method === 'GET') {

        // Step 5: Set appropriate response headers
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;

        // Step 6: Write the response body and end the response
        res.write('<html>');
        res.write('<head><title>Node.js Web Server</title></head>');
        res.write('<body>');
        res.write('<h1>Welcome to My Node.js HTTP Server!</h1>');
        res.write('<p>This server was built using only the built-in <strong>http</strong> module.</p>');
        res.write('<ul>');
        res.write('<li><a href="/">Home</a></li>');
        res.write('<li><a href="/about">About</a></li>');
        res.write('<li><a href="/contact">Contact</a></li>');
        res.write('</ul>');
        res.write('</body></html>');
        res.end(); // Signal that the response is complete

    } else if (req.url === '/about' && req.method === 'GET') {

        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;

        res.write('<html>');
        res.write('<head><title>About - Node.js Server</title></head>');
        res.write('<body>');
        res.write('<h1>About This Server</h1>');
        res.write('<p>This is a simple Node.js HTTP server demonstrating:</p>');
        res.write('<ul>');
        res.write('<li>HTTP module usage</li>');
        res.write('<li>Request and Response handling</li>');
        res.write('<li>URL-based routing</li>');
        res.write('<li>Response headers and status codes</li>');
        res.write('</ul>');
        res.write('<a href="/">Go Back Home</a>');
        res.write('</body></html>');
        res.end();

    } else if (req.url === '/contact' && req.method === 'GET') {

        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;

        res.write('<html>');
        res.write('<head><title>Contact - Node.js Server</title></head>');
        res.write('<body>');
        res.write('<h1>Contact Page</h1>');
        res.write('<p>Email: student@vitap.ac.in</p>');
        res.write('<a href="/">Go Back Home</a>');
        res.write('</body></html>');
        res.end();

    } else {

        // Handle 404 - Page Not Found
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;

        res.write('<html>');
        res.write('<head><title>404 - Not Found</title></head>');
        res.write('<body>');
        res.write('<h1>404 - Page Not Found</h1>');
        res.write('<p>The page you requested does not exist.</p>');
        res.write('<a href="/">Go Back Home</a>');
        res.write('</body></html>');
        res.end();
    }
});

// Step 7: Start the server on the defined port using listen()
server.listen(PORT, () => {
    // Step 8: Display server status in the console
    console.log('==================================================');
    console.log('       Node.js HTTP Web Server - Exercise 1       ');
    console.log('==================================================');
    console.log(`Server is running at: http://localhost:${PORT}`);
    console.log('Available Routes:');
    console.log(`  GET http://localhost:${PORT}/         -> Home Page`);
    console.log(`  GET http://localhost:${PORT}/about    -> About Page`);
    console.log(`  GET http://localhost:${PORT}/contact  -> Contact Page`);
    console.log('Open your browser and visit the URL above.');
    console.log('Press Ctrl+C to stop the server.');
    console.log('==================================================');
});
