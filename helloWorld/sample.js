
// we will learn about nodejs blocking and non  blocking operations in the nodejs

const fs = require("fs");

// console.log(1);
// // blocking operation
// const res = fs.readFileSync("./contacts.txt","utf-8");
// console.log(res);

// console.log(2);


// now we will see the asyncronous behaviour which is non blocking operation that are directly handled by the event loop

console.log(1);
// non-blocking operation
fs.readFile("contacts.txt","utf-8", (err,res) => {
    if(err) console.log(err);
    else console.log(res);
});

console.log(2);

