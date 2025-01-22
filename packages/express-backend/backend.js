import express from "express";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};
const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name);
};
const findUserById = (id) => {
  return users["users_list"].find((user) => user["id"] === id);
};
const addUser = (user) => {
  users["users_list"].push(user)
  return user;
}
const deleteUser = (id) => {
  const index = users["users_list"].findIndex(user => user["id"] === id);
  if(index === -1)
  {
    return false;
  }
  users["users_list"].splice(index,1)
  return true;
};

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Hello World!");
});


 
app.get("/users", (req, res) => {
  const { name, job } = req.query;
  let filteredUsers = users.users_list;

  if (name) {
    filteredUsers = filteredUsers.filter(user => user.name === name);
  }
  
  if (job) {
    filteredUsers = filteredUsers.filter(user => user.job === job);
  }
  
  res.send(filteredUsers);
});


app.get("/users/:id", (req,res) => {
  const id = req.params.id
  let result = findUserById(id);
  if (result === undefined)
  {
    res.status(404).send("Resource not found.")
  }
  else{
    res.send(result)
  }
});

app.post("/users", (req,res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();

});

app.delete("/users/:id", (req,res) => {
  const id = req.params.id;
  const success = deleteUser(id);
  if (success) {
    res.status(200).send({message:"User deleted sucessfully"})
  
  }
  else{
    res.status(404).send({error:"User not found"})

  }
});

app.listen(port,() => {
  console.log("Example app  listening at https://localhost:{port}");
});