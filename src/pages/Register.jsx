/* eslint-disable jsx-a11y/label-has-associated-control */
// import { useContext } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { CiLogin } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../supabase/client';
import style from '../styles/registerPage.module.css';
// import AppContext from "../contexts/AppContext";

const schemaValidation = Yup.object({
  username: Yup.string()
    .min(6, 'Deve contenere almeno 6 caratteri 😡')
    .required('Required'),
  email: Yup.string()
    .email('Inserisci una email valida 🥵')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Deve contenere almeno 4 caratteri 😡')
    .required('password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

function Register() {
  // Invoco la funzione signUp dal context...
  // const { signUp } = useContext(AppContext);
  // Uso lo stato per gestire ogni singolo field del form...
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // gestione form React classica...
  // const handleRegister = async (event) => {
  //   event.preventDefault();
  //   const registerForm = event.currentTarget;
  //   const { username, email, password } = Object.fromEntries(
  //     new FormData(registerForm)
  //   )
  //   try {
  //     let { error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         data: {
  //           username
  //         }
  //       }
  //     })
  //     if (error) {
  //       alert(error.error_description || error.message)
  //     } else {
  //       registerForm.reset();
  //       navigate('/settings');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // gestione form in caso uso di Formik...
  const handleRegisterFormik = async (values) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            username: values.username,
          },
        },
      });
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.error_description || error.message);
      } else {
        navigate('/settings');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className={style.register_container}>
        <div id="Register" className={style.register_element}>
          <h2>Registra come nuovo account</h2>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirm_password: '',
            }}
            validationSchema={schemaValidation}
            onSubmit={(values) => {
              handleRegisterFormik(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <label htmlFor="username">
                  Username
                  <Field
                    name="username"
                    type="text"
                    placeholder="test_account"
                  />
                </label>
                {errors.username && touched.username ? (
                  <p className={style.error_validation}>{errors.username}</p>
                ) : null}
                <label htmlFor="email">
                  Email address
                  <Field
                    name="email"
                    type="email"
                    placeholder="test@gmail.com"
                  />
                </label>
                {errors.email && touched.email ? (
                  <p className={style.error_validation}>{errors.email}</p>
                ) : null}
                <label htmlFor="password">
                  Password
                  <Field
                    name="password"
                    type="password"
                    placeholder="supersecret"
                  />
                </label>
                {errors.password && touched.password ? (
                  <p className={style.error_validation}>{errors.password}</p>
                ) : null}
                <label htmlFor="confirm_password">
                  Confirm Password
                  <Field
                    name="confirm_password"
                    type="password"
                    placeholder="supersecret"
                  />
                </label>
                {errors.confirm_password && touched.confirm_password ? (
                  <p className={style.error_validation}>
                    {errors.confirm_password}
                  </p>
                ) : null}
                <button type="submit">
                  Fai Sign Up
                  <CiLogin
                    style={{
                      marginLeft: '10px',
                    }}
                  />
                </button>
              </Form>
            )}
          </Formik>

          {/* <form onSubmit={handleRegister}>  
            <label htmlFor="username">Username</label>
            <input 
              type="text"
              id="username" 
              name="username" 
              placeholder="testnickname"
            />
            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              placeholder="test@gmail.com"
            />
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="supersecret"
            />
            <label htmlFor="confirm_password">Confirm Password</label>
            <input 
              type="password" 
              id="confirm_password" 
              name="confirm_password" 
              placeholder="supersecret"
            />
            <button type="submit">
              Fai Sign Up
              <CiLogin style={{
                marginLeft: '10px'
              }}/>
            </button>
          </form> */}
          <p>
            Ho gia un account, vai a <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
