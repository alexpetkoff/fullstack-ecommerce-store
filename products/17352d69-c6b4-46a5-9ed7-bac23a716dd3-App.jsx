import "./App.css";
import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovieArr, setSelectedMovieArr] = useState(null);
  const movies = [
    {
      title: "Movie1",
      description: "Description1",
    },
    {
      title: "Movie2",
      description: "Description2",
    },
    {
      title: "Movie3",
      description: "Description3",
    },
    {
      title: "Movie4",
      description: "Description4",
    },
    {
      title: "Movie5",
      description: "Description5",
    },
    {
      title: "Movie6",
      description: "Description6",
    },
    {
      title: "Movie7",
      description: "Description7",
    },
  ];

  let moviesRow = movies.length / 3;
  let arr = [];

  for (let i = 0; i < moviesRow; i++) {
    arr.push(movies.slice(i * 3, i * 3 + 3));
  }

  const arrContent = arr.map((movieArr, index) => {
    return (
      <div key={index} style={{ display: "flex", flexWrap: "wrap" }}>
        {movieArr.map((movie, ind) => {
          return (
            <div
              key={ind}
              style={{
                flexBasis: "30%",
                position: "relative",
              }}
            >
              <h2>{movie.title}</h2>
              <p>{movie.description}</p>
              <button
                onClick={() => {
                  setSelectedMovie(movie);
                  setSelectedMovieArr(index);
                }}
              >
                Select
              </button>
            </div>
          );
        })}
        {selectedMovieArr === index && selectedMovie !== null ? (
          <div
            style={{
              flexBasis: "100%",
            }}
          >
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.description}</p>
          </div>
        ) : null}
      </div>
    );
  });

  return <div className="App">{arrContent}</div>;
}

export default App;
