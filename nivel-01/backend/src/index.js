const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const { response } = require('express');

const app = express();

app.use(express.json());

const projects = []

function logRequest(req, res, next) {
  const { method, url} = req;

  const logLabel = `[{${method.toUpperCase()}} ${url}]`;

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
}

function validateProjectId(req, res, next){
  const { id } = req.params;
  console.log('entrouuu')
  if(!isUuid(id)){
    return res.status(400).json({error: 'Invalido Project ID'})
  }

  return next();
}

app.use(logRequest);
app.use('/project/:id', validateProjectId);


app.get('/project', (req, res) => {
  const { title } = req.query;
  console.log(title)

  const result = title
    ? projects.filter(project => project.title.includes(title)) 
    : projects;

  return res.json(result)
})

app.post('/project', (req, res) => {
  const { title, owner } = req.body;
  const project = { id: uuid(), title, owner }
  projects.push(project)
  return res.status(200).json(project);
})

app.put('/project/:id',  (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;
  
  const projectIndex = projects.findIndex(project => project.id === id)

  if(projectIndex < 0){
    return res.status(400).json({error: 'Project is not exist'})
  }

  const project = {
    id,
    title,
    owner
  }

  projects[projectIndex] = project;

  return res.status(200).json(project);
})

app.delete('/project/:id',  (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id === id)

  if(projectIndex < 0){
    return res.status(400).json({error: 'Project is not exist'})
  }

  projects.splice(projectIndex, 1);
  return res.status(204).send();
})

app.listen(3333, () => {
  console.log('🚀 Back-end started!!!')
});