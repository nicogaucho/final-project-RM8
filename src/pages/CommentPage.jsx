import { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import supabase from '../supabase/client';
import style from '../styles/commentPage.module.css';

function CommentPage() {
  const game = useLoaderData();
  const [success, setSuccess] = useState(false);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const commentForm = event.currentTarget;
    const { title, content } = Object.fromEntries(new FormData(commentForm));
    if (
      typeof title === 'string' &&
      typeof content === 'string' &&
      title.trim().length !== 0 &&
      content.trim().length !== 0
    ) {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            game_id: game.id,
            game_name: game.name,
            comment_title: title,
            comment_content: content,
          },
        ])
        .select();
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      } else {
        commentForm.reset();
        setSuccess(true);
      }
    }
  };

  return (
    <div>
      <article className={style.comment_wrapper}>
        <h3>
          Scrivi la tua recensione su <br />
          <span
            style={{
              color: '#0F7A9E',
            }}
          >
            {game.name}
          </span>{' '}
        </h3>
        <form onSubmit={handleCommentSubmit}>
          <label htmlFor="title">
            Titolo recensione
            <input type="text" id="title" name="title" />
          </label>
          <label htmlFor="content">
            Contenuto
            <textarea
              type="text"
              id="content"
              name="content"
              placeholder="scrivi qui la tua recensione..."
            />
          </label>
          <button type="submit">Pubblica</button>
        </form>
      </article>
      {success ? (
        <dialog open>
          <article>
            <h2>Pubblicata ✅</h2>
            <p>
              Recensione pubblicata con successo. <br /> Grazie ancora per aver
              lasciato la tua recesione su {game.name}! 👏🏻
            </p>
            <footer>
              <Link to="/">
                <button type="button" className="secondary">
                  Back Home
                </button>
              </Link>
            </footer>
          </article>
        </dialog>
      ) : (
        ''
      )}
    </div>
  );
}

export default CommentPage;
