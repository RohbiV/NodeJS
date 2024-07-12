// suppose we have a functions in math.js file, we need to acess it, we could use require that is commonModule

const {add,sub} = require("./math"); //using commonmodule

console.log(add(2,44));
console.log(add(55,44));
