import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameCard from '../components/GameCard';
import AppSideBar from '../components/AppSideBar';

export default function GenrePage() {
  const { genre } = useParams();
  const [genreGames, setGenreGames] = useState([]);

  useEffect(() => {
    async function getGenre() {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}games?key=${
          import.meta.env.VITE_API_KEY
        }&genres=${genre}`
      );
      const json = await response.json();
      setGenreGames(json.results);
    }
    getGenre();
  }, [genre]);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        marginTop: '50px',
      }}
    >
      <AppSideBar
        style={{
          width: '30%',
        }}
      />
      <div
        style={{
          width: '80%',
        }}
      >
        <h1
          style={{
            margin: '0',
            padding: '0',
          }}
        >
          {' '}
          {genre} games
        </h1>
        <p
          style={{
            fontSize: '16px',
          }}
        >
          {genre} is a genre that includes fights, puzzles, and strategies
          emphasizing coordination and reaction. It includes a large variety of
          sub-genres like fighting, beat 'em ups, shooters, survivals, mazes,
          and platforms; sometimes even multiplayer online battles and real-time
          strategies. Usually, the player performs as the protagonist with its
          unique abilities; some games add power-ups along the way. The
          character aims to complete levels, collect items, avoid obstacles, and
          battle against antagonists. It's necessary to avoid severe injuries
          during fights; if the health bar goes low, the player loses. Some
          games have an unbeatable number of enemies, and the only goal is to
          maximize score and survive for as long as possible.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '5px',
            gridAutoRows: 'minmax(200px, auto)',
          }}
        >
          {genreGames &&
            genreGames.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
      </div>
    </div>
  );
}
