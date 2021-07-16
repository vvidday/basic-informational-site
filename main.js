import * as http from 'http';
import * as fs from 'fs/promises';

http.createServer(async (req, res)=>{
    const baseURL = "http://localhost:8080";
    const reqURL = new URL(req.url, baseURL);
    const desPath = reqURL.pathname === "/" ? "index.html" : reqURL.pathname.substring(1) + ".html";
    try{
        const data = await fs.readFile(desPath);
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        res.end();
    }
    catch(err){
        console.log(err);
        const newData = await fs.readFile("404.html");
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(newData);
        res.end();
    }
    
}).listen(8080);