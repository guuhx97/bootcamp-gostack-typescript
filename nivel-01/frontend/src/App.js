import React, { useState, useEffect } from 'react';

import './App.css'
import api from './services/api';

import Header from './components/Header';
function App() {
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState('')
  const [owner, setOwner] = useState('')


  useEffect(() =>{
    api.get('/project').then(response => {
      setProjects(response.data)
    })
  }, [])


  async function handleAddProjet() {
   const response = await api.post('/project',{
    title: `Novo Projeto ${Date.now()}`,
    owner: "Gustavo"
   })
   setProjects([...projects, response.data])
  }

  return (
    <>
      <Header title="Homepage"/>
      <ul>
        { projects.map(project => <li key={project.title}>{project.title}</li>)}
      </ul>



      <button type="button" onClick={handleAddProjet}>Adicionar Projeto</button>
    </>)
}

export default App;