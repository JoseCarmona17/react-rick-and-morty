import { useEffect, useState, useTransition } from "react";
import Character from "./Character";

function refreshPage() {
  window.location.reload(false);
}

function NavPage(props) {
  if (props.page < 1){
    refreshPage()
  }
  return (
    
    <header className="d-flex justify-content-between aling-items-center">

     <button
        className="btn btn-primary btn-sm"
        onClick={() => props.setPage(props.page - 1)}
      >
        page {props.page - 1}
        
      </button>

      <p>Page: {props.page}</p>

      <button
        className="btn btn-primary btn-sm"
        onClick={() => props.setPage(props.page + 1)}
      >
        page {props.page + 1}
      </button>

    </header>
  );
}

function CharacterList() {
  const [characters, setcharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const data = await response.json();
      setLoading(false);
      setcharacters(data.results);

    }

    fetchData();
  }, [page]);

  return (
    <div className="container">
      <NavPage page={page} setPage={setPage} />

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="row">
          {characters.map((character) => {
            return (
              <div className="col-md-4" key={character.id}>
                <Character character={character} />
              </div>
            );
          })}
        </div>
      )}
      <NavPage page={page} setPage={setPage} />
    </div>
  );
}

export default CharacterList;
