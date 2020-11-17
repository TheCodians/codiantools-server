import express, { response } from "express";
import bcrypt from 'bcrypt-nodejs';
import cors from "cors";
import knex from 'knex';

const app = express();
app.use(express.json());

const database = {
  users: [
    {
      id: "11",
      name: "Prashant",
      email: "prashant@gmail.com",
      password: "1234",
      entries: 0,
      joined: new Date()
    },
    {
      id: "22",
      name: "Saksham",
      email: "saksham@gmail.com",
      password: "123",
      entries: 0,
      joined: new Date()
    },
    {
      id: "33",
      name: "Saras",
      email: "saras@gmail.com",
      password: "123",
      entries: 0,
      joined: new Date()
    },
    {
      id: "44",
      name: "Hemant",
      email: "hemant@gmail.com",
      password: "123",
      entries: 0,
      joined: new Date()
    },
    {
      id: "55",
      name: "Rishabh",
      email: "rishabh@gmail.com",
      password: "123",
      entries: 0,
      joined: new Date()
    },
    {
      id: "66",
      name: "Shlok",
      email: "shlok@gmail.com",
      password: "123",
      entries: 0,
      joined: new Date()
    },
  ], 
};

app.use(cors());

app.get("/", (req, res) => {
  res.json(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: "33",
    name: name,
    email: email,
    password: password,
    entries:0,
    joined:new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if(!found){
    res.status(404).json("no such user");
  }
});

app.get('/list', (req, res) => {
  res.json(database.users);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("app is running on port ${process.env.PORT}");
});
