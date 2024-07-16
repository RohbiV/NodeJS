// checking how many cores of cpu are there in my pc

const os = require("os");

console.log(os.cpus().length);

const fs = require("fs");

fs.writeFileSync("./rev.txt", "This is for revision purpose!");

const res = fs.readFileSync("./rev.txt","utf-8");

console.log(res);

fs.appendFileSync("./rev.txt","this is appeded data");


