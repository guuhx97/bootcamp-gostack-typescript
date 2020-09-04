import React, { useState } from 'react';

import './App.css'
import background from './assets/teste.png';

import Header from './components/Header';
function App() {

  const [projects, setProjects] = useState(['TESTE1', 'TESTE2'])


  function handleAddProjet() {
   setProjects([...projects, 'NOVO'])
  }

  return (
    <>
      <Header title="Homepage"/>
      <img src={background} alt="foto"/>
      <ul>
        { projects.map(project => <li key={project}>{project}</li>)}
      </ul>

      <button type="button" onClick={handleAddProjet}>Adicionar Projeto</button>
    </>)
}

export default App;