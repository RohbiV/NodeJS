//requiring necessary modules

const express = require("express");
const fs = require("fs"); // for writing in the database created using site
const users = require("./MOCK_DATA.json");
const app = express(); // creating req handler
const PORT = 7000;

//applying middleware to get the data send with api call   also known as plugin

app.use(express.urlencoded({ extended: false }));

//  creating our own middleware
// app.use((req, res, next) => {
//     console.log("Hello from my middleware!");         //api stops working as this middleware does not send the request to routes , it holds the request of the client forever

// //   return res.json({msg:"HELLO!"});           // it will now return the response and does not allow the req to proceed further

// // therefore  we will use the next function which automatically finds the next middleware or route

//     fs.appendFile(
//         "log.txt",
//         `${Date.now()} : ${req.method} : ${req.path} `,
//         (err,data) => {
//             next();
//         });
// });

app.use( (req,res, next) => {
    console.log("Hello from my own middleware!");
    fs.appendFile("log.txt", `${Date.now()} : ${req.path} : ${req.method} : ${req.ip}`, (err,data) => next())
});




app.get("/", (req, res) => {
  //homepage
  return res.send("HOMEPAGE!");
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((users) => `<li>${users.first_name}</li>`).join("")}
    </ul>
    `;

  res.send(html);
});

app.get("/api/users", (req, res) => {
  // user's page list all the users
  return res.json(users);
});

//now routing for dynamic path
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const body = req.body;
    console.log(body); // for showing what is to updated
    console.log(body.first_name);

    // now updating the user
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    user.first_name = body.first_name;

    fs.readFile("./MOCK_DATA.json", "utf-8", (err, data) => {
      const json = JSON.parse(data);

      for (const user of json) {
        if (user.id === id) {
          // console.log(user.first_name);
          // console.log(body.first_name);
          user.first_name = body.first_name;
        }
      }

      fs.writeFile("./MOCK_DATA.json", JSON.stringify(json), "utf-8", (err) => {
        return res.json("user with id " + id + " has been succesfully updated");
      });

      // console.log(body.first_name);
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const filteredUser = users.filter((u) => u.id !== id);
    const userToDelete = users.findIndex((u) => u.id === id);
    users.splice(userToDelete, 1);

    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(filteredUser),
      "utf-8",
      (err) => {
        return res.json({ status: "Successfully deleted user" });
      }
    );
  });

app.post("/api/users", (req, res) => {
  // to create a user

  // getting the data of new user/
  const body = req.body;
  console.log(body);

  users.push({ ...body, id: users.length + 1 });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length });
  });
});

app.listen(PORT, () => console.log("Server Started!!"));
