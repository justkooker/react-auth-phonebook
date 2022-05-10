import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/features/phonebook/contactsSlice';
import routes from './routes/routes';
import { LoginView } from './views/LoginView/LoginView';
import RegisterView from './views/RegisterView';
import PrivatRoute from './routes/PrivatRoute';
import PhonebookView from './views/PhonebookView';
import RestrictedRoute from './routes/RestrictedRoute';
function Phonebook() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  useEffect(() => {
    if (isAuth) {
      dispatch(fetchContacts());
    }
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivatRoute>
              <PhonebookView />
            </PrivatRoute>
          }
        />

        <Route
          path={routes.login}
          element={
            <RestrictedRoute>
              <LoginView />
            </RestrictedRoute>
          }
        />

        <Route
          path={routes.register}
          element={
            <RestrictedRoute>
              <RegisterView />
            </RestrictedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default Phonebook;
