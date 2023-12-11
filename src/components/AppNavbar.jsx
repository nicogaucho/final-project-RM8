import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useProfile from '../hooks/useProfile';
import AppContext from '../contexts/AppContext';
import supabase from '../supabase/client';

export default function AppNavbar() {
  const { session } = useContext(AppContext);
  const { profile } = useProfile();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <strong>
            <Link to="/">AulabGamerHub</Link>
          </strong>
        </li>
      </ul>
      {session ? (
        <ul>
          <li>
            <details role="list" dir="rtl">
              <summary aria-haspopup="listbox" role="link">
                {profile &&
                  (profile.username || session.user.user_metadata.full_name)}
              </summary>
              <ul role="listbox">
                <li>
                  <Link to="/account">Account page</Link>
                </li>
                <li>
                  <Link to="/settings">Settings page</Link>
                </li>
                <li style={{ cursor: 'pointer' }}>
                  <button type="button" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
