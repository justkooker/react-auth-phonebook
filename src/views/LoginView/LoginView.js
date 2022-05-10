import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import routes from '../../routes/routes';
import { phonebookLogin } from '../../redux/features/phonebook/authSlice';
import commonStyles from '../../commonStyles/form.module.css';
import styles from './LoginView.module.css';
export function LoginView() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const onInutChange = e => {
    const name = e.target.name;
    setUser({ ...user, [name]: e.target.value });
  };
  const onHandleSubmit = e => {
    e.preventDefault();
    dispatch(phonebookLogin(user));
    navigate(routes.home, { replace: true });
    setUser({
      email: '',
      password: '',
    });
  };
  return (
    <div className={styles.container}>
      <h1 className={commonStyles.formName}> Please login </h1>
      <form onSubmit={onHandleSubmit} className={commonStyles.form}>
        <input
          onChange={onInutChange}
          type="email"
          name="email"
          value={user.email}
          placeholder="Email"
        />
        <input
          onChange={onInutChange}
          type="password"
          name="password"
          value={user.password}
          placeholder="Password"
        />
        <button type="submit" className={commonStyles.formButton}>
          Login
        </button>
      </form>

      <NavLink to="/register">registration</NavLink>
    </div>
  );
}
