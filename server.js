const fs = require("fs");
const http = require("http");

const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response)=>{
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");

    let path ='./';
    switch(request.url){
        case '/':
            path += 'index.html';
            response.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            response.statusCode = 200;
            break;
        default:
            path += '404.html';
            //for redirecting to home page do the next line
            // response.setHeader('Location', '/' )
            response.statusCode = 301;
            break;
    }

    fs.readFile(path, (err, data)=>{
        if(err){
            console.log(err);
            response.end();
        }else{
            response.write(data);
            response.end();
        }
    })
});

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});


