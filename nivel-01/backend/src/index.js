const express = require('express');

const app = express();

const projects = [];

app.use(express.json())

app.get('/projects', (req, res) => {
  return res.json(projects)
});

app.post('/projects', (req, res) => {
  const {project} = req.body;
  projects.push(project);
  return res.status(201).json({message: "sucess"});
});

app.put('/projects', (req, res) => {
  return res.json({message: "Hello World"})
});

app.delete('/projects', (req, res) => {
  return res.json({message: "Hello World"})
});

app.listen(3334, () => {
  console.log("Back-end started!!!")
});