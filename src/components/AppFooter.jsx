import { Link } from 'react-router-dom';

export default function AppFooter() {
  return (
    <footer>
      <p style={{ margin: '0', padding: '0' }}>
        @copyright 2023 Masterclass React 8
      </p>
      <nav aria-label="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/">Devs team</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
