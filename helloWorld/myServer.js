
//  Creating my server using http module in nodejs

const http = require("http");
const fs = require("fs");


const myServer = http.createServer((req,res)=>{
    console.log("New Request Recieved!");
    console.log(req.headers);
    const log = `Date.now(): New Request Recieved!!`;

    fs.appendFile("log.txt", log, (err, data)=> {
        res.end("Hello from server Again!!");
    });

});

myServer.listen(8000, () => console.log("Server Started!!"));




