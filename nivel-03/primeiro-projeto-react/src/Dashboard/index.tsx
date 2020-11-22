import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../services/api';

import logoImg from '../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storegedRepo = localStorage.getItem('@GithubExplorer:repositories');
    if(storegedRepo){
      return JSON.parse(storegedRepo);
    }else{
      return []
    }
  });
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');



  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
  }, [repositories])

  async function  handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if(!newRepo) {
      setInputError('Digite autor/nome do repositório');
      return;
    }
    try {
      const { data } = await api.get(`repos/${newRepo}`);
      setRepositories([...repositories, data]);
      setInputError('');
      setNewRepo('');
    }catch(err) {
      setInputError('Erro na busca por esse repositório.')
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer"/>
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input type="text" placeholder="Digite o nome do repositório" value={newRepo} onChange={(e) => setNewRepo(e.target.value)} />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      
      <Repositories>
        {repositories.map(repository => (
              <Link to={`/repository/${repository.full_name}`} key={repository.full_name}>
                <img src={repository.owner.avatar_url} alt="Profile"/>
                <div>
                  <strong>{repository.full_name}</strong>
                  <p>{repository.description}</p>
                </div>
                <FiChevronRight size={30} />
              </Link>
          ))}
        </Repositories>
    </>
  );
}

export default Dashboard;