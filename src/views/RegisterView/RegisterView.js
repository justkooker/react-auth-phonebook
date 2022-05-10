import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import routes from '../../routes/routes';
import { phonebookRegister } from '../../redux/features/phonebook/authSlice';
import styles from './RegisterView.module.css';
import commonStyles from '../../commonStyles/form.module.css';
function RegisterView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const onChangeInput = e => {
    const name = e.target.name;
    setUser({ ...user, [name]: e.target.value });
  };
  const onFormHandleSubmit = e => {
    e.preventDefault();
    navigate(routes.home, { repalce: true });
    dispatch(phonebookRegister(user));
    setUser({
      name: '',
      email: '',
      password: '',
    });
  };
  return (
    <div className={styles.container}>
      <h1 className={commonStyles.formName}> Fill register form </h1>
      <form onSubmit={onFormHandleSubmit}>
        <input
          onChange={onChangeInput}
          type="text"
          value={user.name}
          name="name"
        />
        <input
          onChange={onChangeInput}
          type="email"
          value={user.email}
          name="email"
        />
        <input
          onChange={onChangeInput}
          type="password"
          value={user.password}
          name="password"
        />

        <button type="submit" className={commonStyles.formButton}>
          submit
        </button>
      </form>
    </div>
  );
}
export default RegisterView;
