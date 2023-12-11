import { Link } from 'react-router-dom';

function GameCard({ game }) {
  return (
    <article>
      <h4>{game.name}</h4>
      <img src={game.background_image} alt="game" />
      <p>{game.genres.map((genre) => genre.name).join(', ')}</p>
      <Link to={`/game/${game.id}`}>Vai al Gioco</Link>
    </article>
  );
}

export default GameCard;
