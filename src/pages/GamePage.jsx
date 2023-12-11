import { useLoaderData, Link } from 'react-router-dom';
import { RiMailSendLine } from 'react-icons/ri';
import { useContext, useEffect, useState } from 'react';
// import useProfile from '../hooks/useProfile';
import supabase from '../supabase/client';
import useProfile from '../hooks/useProfile';
import style from '../styles/gamePage.module.css';
import Messages from '../components/Messages';
import Comments from '../components/Comments';
import AppContext from '../contexts/AppContext';

export async function getSingleGame({ params }) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}games/${params.id}?key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const json = await response.json();
  return json;
}

function GamePage() {
  const { session } = useContext(AppContext);
  const { profile } = useProfile();
  const game = useLoaderData();
  const [fav, setFav] = useState([]);

  const getFavGame = async () => {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('game_id', game.id)
      .eq('profile_id', session.user.id);
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      setFav(() => [...data]);
    }
  };

  const addToFavorites = async () => {
    const { error } = await supabase
      .from('favorites')
      .insert([
        {
          game_id: game.id,
          game_name: game.name,
        },
      ])
      .select();
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      getFavGame();
    }
  };

  const removeFromFavorites = async () => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('game_id', game.id)
      .eq('profile_id', session.user.id);
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      getFavGame();
    }
  };

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const inputForm = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputForm));
    if (typeof message === 'string' && message.trim().length !== 0) {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            profile_id: session.user.id,
            game_id: game.id,
            content: message,
          },
        ])
        .select();
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      } else {
        inputForm.reset();
        console.log(data);
      }
    }
  };

  useEffect(() => {
    if (session) {
      getFavGame();
    }
  }, []);

  return (
    <div>
      <div className={style.game_container}>
        <div className={style.info_game_container}>
          <h1>{game.name}</h1>
          <img src={game.background_image} width={300} alt="" />
          <div
            style={{
              margin: '20px 0px',
            }}
          >
            Disponibile per:
            <p>{game.platforms.map((p) => p.platform.name).join(', ')}</p>
          </div>
          {profile && (
            <div>
              {fav.length !== 0 ? (
                <button
                  type="button"
                  className={`${style.fav_btn} secondary`}
                  onClick={removeFromFavorites}
                >
                  Remove from Favorites
                </button>
              ) : (
                <button
                  type="button"
                  className={style.fav_btn}
                  onClick={addToFavorites}
                >
                  Add to Favorites
                </button>
              )}
              <Link
                to={`/game/${game.id}/comment`}
                style={{
                  textDecoration: 'none',
                }}
              >
                <button
                  type="button"
                  className={`${style.fav_btn} contrast outline`}
                >
                  Write a review
                </button>
              </Link>
            </div>
          )}
        </div>
        {profile && (
          <div className={style.chat_game_container}>
            <Messages game={game} />
            <div className={style.message_form_wrapper}>
              <p
                style={{
                  margin: '10px 0',
                  padding: '0',
                }}
              >
                Chat message with gamers
              </p>
              <form
                className={style.message_form}
                onSubmit={handleMessageSubmit}
              >
                <input
                  className={style.message_input}
                  type="text"
                  name="message"
                  placeholder="type your message..."
                />
                <button
                  type="submit"
                  className={`${style.message_send_btn} contrast`}
                >
                  Send
                  <RiMailSendLine
                    style={{
                      marginLeft: '5px',
                    }}
                  />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Comments game={game} />
    </div>
  );
}

export default GamePage;
