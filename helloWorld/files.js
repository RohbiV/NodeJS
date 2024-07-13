// importing file module using require keyword

const  fs = require("fs");

// suppose i want to create a file
fs.writeFileSync("./text.txt", "This is the file created using files.js");    //this will create a file synchronously

// suppose we want to read the contact file we could use 2 functions one is sync another one is async

// const phones  = fs.readFileSync("./contacts.txt","UTF-8"); //this is a sync method
// console.log(phones);

// we could also use async method
fs.readFile("./contacts.txt","utf-8", (err, res)=> {                    // this method does not return anything it is void type and requires a callback function
    if(err) {
        console.log(err);
    } else {
        console.log(res);
    }
});

fs.appendFileSync("./text.txt", `${Date.now()} Hello vasu`);      // it is used for appending the text in the same file

const text = fs.readFileSync("./text.txt", "utf-8");
console.log(text);


// // now for deleting the file
// fs.unlinkSync("./copy.txt");      // copy.txt file gets removed


// we could also see the stats for the files using fs.stats
const stats = fs.statSync("./text.txt");
console.log(stats);


