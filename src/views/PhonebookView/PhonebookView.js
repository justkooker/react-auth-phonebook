import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactForm from '../../components/ContactForm';
import ContactList from '../../components/ContactList';
import Filter from '../../components/Filter';
import {
  phonebookLogout,
  phonebookCurrentUser,
} from '../../redux/features/phonebook/authSlice';

import styles from './PhonebookView.module.css';
const PhonebookView = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const isAuth = useSelector(state => state.auth.isAuth);
  const name = useSelector(state => state.auth.user.name);
  useEffect(() => {
    dispatch(phonebookCurrentUser(token));
  }, []);
  return (
    <>
      {isAuth ? (
        <div className={styles.logoutContainer}>
          <span>{name}</span>{' '}
          <button
            className={styles.logoutBtn}
            onClick={() => dispatch(phonebookLogout())}
            type="button"
          >
            logout
          </button>
        </div>
      ) : (
        <p></p>
      )}

      <div className={styles.container}>
        <ContactForm />
        <Filter />
        <ContactList />
      </div>
    </>
  );
};
export default PhonebookView;
