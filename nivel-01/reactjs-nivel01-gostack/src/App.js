import React, { useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  },[])

  async function handleAddRepository() {
    const repository = await api.post('/repositories', {
      title: `Desafio 02 ${Date.now()}`,
      url: "https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/faq-desafios",
      techs: ["Nodejs", "Reactnative"]
    })

    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)
    if(response.status === 400){
      return;
    }
    const newList = repositories.filter(rep => rep.id !== id);
    setRepositories(newList);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        } 
      </ul>

      <button type="buttom" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
