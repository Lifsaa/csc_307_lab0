import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

function RNG() {
  return Math.random().toString(36).slice(2,9);
}

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
  const newUser = { id:RNG(),...user};
  users["users_list"].push(newUser)
  return newUser;
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
  const newUser = addUser(userToAdd);
  res.status(201).send(newUser);

});

app.delete("/users/:id", (req,res) => {
  const id = req.params.id;
  const success = deleteUser(id);
  if (success) {
    res.status(204).send({message:"User deleted sucessfully"})
  
  }
  else{
    res.status(404).send({error:"User not found"})

  }
});

app.listen(port,() => {
  console.log("Example app  listening at https://localhost:{port}");
});