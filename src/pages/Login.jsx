// import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaDiscord } from 'react-icons/fa';
import { CiLogin } from 'react-icons/ci';
import supabase from '../supabase/client';
import style from '../styles/loginPage.module.css';
// import AppContext from "../contexts/AppContext";

function Login() {
  // const { signIn } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginForm = event.currentTarget;
    const { email, password } = Object.fromEntries(new FormData(loginForm));
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.error_description || error.message);
      } else {
        loginForm.reset();
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginWithDiscord = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: 'https://final-project-rm-8.vercel.app/',
        },
      });
      console.log(data, error);
      // if (error) {
      //   alert(error.error_description || error.message)
      // } else {
      //   navigate('/settings')
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className={style.login_container}>
        <div id="LoginEmail" className={style.login_element}>
          <h1>Log In</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">
              Email address
              <input
                type="email"
                id="email"
                name="email"
                placeholder="test@gmail.com"
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                name="password"
                placeholder="supersecret"
              />
            </label>
            <button type="submit">
              Fai sign In
              <CiLogin className={style.login_icons} />
            </button>
          </form>
        </div>
        <div id="LoginOAuth" className={style.login_element}>
          <h1>Puoi fare login con Social auth</h1>
          <button type="button" className="secondary">
            Login con Google
            <FaGoogle className={style.login_icons} />
          </button>
          <button
            type="button"
            className="contrast"
            onClick={handleLoginWithDiscord}
          >
            Login con Discord
            <FaDiscord className={style.login_icons} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
