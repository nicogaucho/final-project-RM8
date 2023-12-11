import { Link } from 'react-router-dom';
import style from '../styles/aside.module.css';

export default function Genres({ genres }) {
  return (
    <aside className={style.filter_aside}>
      <nav>
        <span
          style={{
            fontWeight: 'bold',
          }}
        >
          Categorie
        </span>
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>
              <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
