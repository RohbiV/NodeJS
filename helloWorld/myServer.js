
//  Creating my server using http module in nodejs

const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req,res) => {
    return res.send(`Hello from home page! `);
});

app.get("/about", (req,res) => {
    return res.send(`Hello from about page ${req.query.name}`);
}) ;


// function myHandler(req,res) {
//     console.log("New Request Recieved!");
//     console.log(req.headers);
//     const log = `${Date.now()}: ${req.method} ${req.url} New Request Recieved!!\n`;
    
//     const myUrl = url.parse(req.url,true);
//     console.log(myUrl);


//     fs.appendFile("log.txt", log, (err, data)=> {
//         switch (myUrl.pathname) {
//             case '/': 
//                 if(req.method === 'GET') res.end("Home Page");
//                 break;

//             case '/about': 
//                 const userName = myUrl.query.myname;
//                 res.end(`Hi ${userName}`);
//                 break;

//             case '/contact': res.end("Contact Page");
//                 break;  

//             case '/signup': 
//                 if(req.method === 'GET') res.end("This is a signup Form!");
//                 else if(req.method === 'POST') {
//                     // db Query
//                     res.end("Success!");
//                 }

//             default: res.end("404 Page not Found!!"); 
//                 break;
//         }
//     })
// }

const myServer = http.createServer(app);

myServer.listen(2000, () => console.log("Server Started!!"));




