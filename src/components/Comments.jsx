import { useEffect, useState } from 'react';
import supabase from '../supabase/client';
import style from '../styles/gamePage.module.css';
import formatMessageDate from '../utils/formatMessageDate';

function Comments({ game }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*, profile: profiles(username)')
        .eq('game_id', game.id);
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      } else {
        setComments(data);
      }
    };
    getComments();
  }, []);

  return (
    <div>
      <h3>Il gioco potrebbe avere delle Recensioni</h3>
      <h4>
        Recensioni{' '}
        <span
          style={{
            color: '#0F93BF',
          }}
        >
          {game.name}
        </span>
      </h4>
      {comments.length !== 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <div className={style.comment_container}>
              <article>
                <p className={style.comment_title}>{comment.comment_title}</p>
                <p>{comment.comment_content}</p>
                <div className={style.comment_details}>
                  <p className={style.detail}>
                    Pubblicato da: {comment.profile.username}
                  </p>
                  <p className={style.detail}>
                    {formatMessageDate(comment.created_at)}
                  </p>
                </div>
              </article>
            </div>
          </div>
        ))
      ) : (
        <p>non ci sono recensioni per questo gioco</p>
      )}
    </div>
  );
}

export default Comments;
