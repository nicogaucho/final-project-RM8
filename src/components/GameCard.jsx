import { Link } from 'react-router-dom';
import style from '../styles/gameCard.module.css';

function GameCard({ game }) {
  return (
    <Link to={`/game/${game.id}`} className={style.card_game}>
      <article className={`${style.expose} ${style.layout_card}`}>
        <img src={game.background_image} alt="game" />
        <h4>{game.name}</h4>
        <p>{game.genres.map((genre) => genre.name).join(', ')}</p>
      </article>
    </Link>
  );
}

export default GameCard;
