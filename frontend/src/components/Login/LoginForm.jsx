import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import SlideShow from '../SlideShow/SlideShow';
import errorImg from '../../assets/error.svg';
import errorClose from '../../assets/Close_square.svg';

function LoginForm({ onLogIn, authError, setAuthError, handleCloseError }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onLogIn({
      email,
      password
    })

    setEmail('');
    setPassword('');
    setAuthError('');
  };

  return (
    <>
    <div className="container">
      <div className="container-panel container-panel_left">
        <SlideShow />
      </div>
      <div className="container-panel container-panel_right">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form__title">
            Log In
          </h2>
          <div className="form__input-box">
            <label className="form__label">Email</label>
            <input type="text" className="form__input" id="email" value={email} onChange={handleEmailChange} />
          </div>
          <div className="form__input-box">
            <label className="form__label">Password</label>
            <input type={showPassword ? "text" : "password"} className="form__input" id="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button className="form__button" id='submit' type="submit">Log In</button>
          <p>Don`t have an account? Please, <Link to="/signup" className="form__link">Sign up</Link></p>
        </form>
        {authError ? <div className="error-auth">
            <div className="error-auth__box">
              <img className="error-auth__icon" src={errorImg} alt="error icon"/>
              <p className="error-auth__message">{authError}</p>
            </div>
            <img className="error-auth__icon error-auth__icon--close" src={errorClose} alt="error close" onClick={handleCloseError} />
        </div> : null}
      </div>
    </div>
    {/* <Navbar/> */}
    </>
  );
}

export default LoginForm;
