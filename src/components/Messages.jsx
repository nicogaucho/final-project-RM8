import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import supabase from '../supabase/client';
import style from '../styles/gamePage.module.css';

function Messages({ game }) {
  const [chat, setChat] = useState([]);
  const chatRef = useRef(null);
  dayjs.extend(relativeTime);

  const getMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*, profile: profiles(username)')
      .eq('game_id', game.id);
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      setChat(data);
    }
  };

  useEffect(() => {
    getMessages();
    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
        },
        () => getMessages()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className={style.messages} ref={chatRef}>
      {chat &&
        chat.map((message) => (
          <article key={message.id} className={style.chat_message}>
            <p className={style.chat_username}>{message.profile.username}</p>
            <div>
              <p className={style.message}>{message.content}</p>
              <p className={style.timestamps}>
                {dayjs().to(dayjs(message.created_at))}
              </p>
            </div>
          </article>
        ))}
    </div>
  );
}

export default Messages;
