
//  Creating my server using http module in nodejs

const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req,res)=>{
    console.log("New Request Recieved!");
    console.log(req.headers);
    const log = `${Date.now()}: ${req.method} ${req.url} New Request Recieved!!\n`;
    
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);


    fs.appendFile("log.txt", log, (err, data)=> {
        switch (myUrl.pathname) {
            case '/': 
                if(req.method === 'GET') res.end("Home Page");
                break;

            case '/about': 
                const userName = myUrl.query.myname;
                res.end(`Hi ${userName}`);
                break;

            case '/contact': res.end("Contact Page");
                break;  

            case '/signup': 
                if(req.method === 'GET') res.end("This is a signup Form!");
                else if(req.method === 'POST') {
                    // db Query
                    res.end("Success!");
                }

            default: res.end("404 Page not Found!!"); 
                break;
        }
    });

});

myServer.listen(2000, () => console.log("Server Started!!"));




