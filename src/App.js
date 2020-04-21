import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() {
    let data = {}
    api.post('repositories', data)
      .then(response => {
        setRepositories([...repositories, response.data]);
      })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
      .then(() => {
        const repos = repositories.filter(repo => repo.id != id);
        setRepositories(repos);
      });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
