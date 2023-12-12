/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect, useContext } from 'react';
import { FaTrash } from 'react-icons/fa6';
import useProfile from '../hooks/useProfile';
import getProfileImg from '../utils/getProfileImg';
import formatMessageDate from '../utils/formatMessageDate';
import supabase from '../supabase/client';
import style from '../styles/gamePage.module.css';
import AppContext from '../contexts/AppContext';

function Account() {
  const { session } = useContext(AppContext);
  const { profile, loading } = useProfile();
  const [comments, setComments] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const getComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*, profile: profiles(username)')
      .eq('profile_id', session.user.id);
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      setComments(data);
    }
  };

  const removeFromComments = async (id) => {
    const { error } = await supabase.from('comments').delete().eq('id', id);
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      getComments();
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    const getFav = async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('profile_id', session.user.id);
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      } else {
        setFavorites(data);
      }
    };
    getFav();
  }, []);

  return (
    <div className="container">
      {loading && <progress />}
      <img
        src={profile && getProfileImg(profile.avatar_url)}
        alt="profile"
        width={200}
      />
      <h1>
        Benvenuto{' '}
        {profile && (profile.username || session.user.user_metadata.full_name)}
      </h1>
      <div>
        <details>
          <summary>Le tue Reviews</summary>
          {comments.length !== 0 ? (
            comments.map((c) => (
              <div key={c.id}>
                <div className={style.comment_container}>
                  <article>
                    <p className={style.comment_title}>{c.comment_title}</p>
                    <p>{c.comment_content}</p>
                    <div className={style.comment_details}>
                      <p className={style.detail}>
                        Published by: {c.profile.username}
                      </p>
                      <p className={style.detail}>
                        {formatMessageDate(c.created_at)}
                      </p>
                    </div>
                    <FaTrash
                      className={style.remove_review}
                      onClick={() => removeFromComments(c.id)}
                    />
                  </article>
                </div>
              </div>
            ))
          ) : (
            <p>non ci sono recesioni</p>
          )}
        </details>

        <details>
          <summary>I tuoi Preferiti</summary>
          <ul>
            {favorites &&
              favorites.map((favGame) => (
                <li key={favGame.id}>{favGame.game_name}</li>
              ))}
          </ul>
        </details>
      </div>
    </div>
  );
}

export default Account;
