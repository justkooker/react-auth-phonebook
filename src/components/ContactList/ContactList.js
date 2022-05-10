import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/features/phonebook/contactsSlice';
import styles from './ContactList.module.css';
const ContactList = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
  const dispatch = useDispatch();
  return visibleContacts.length !== 0 ? (
    <ul className={styles.contactList}>
      {visibleContacts.map(({ name, number, id }) => (
        <li className={styles.listItem} key={id}>
          <div className={styles.container}>
            <span>{name}</span>
            <span>{number}</span>
          </div>
          <button
            className={styles.listItemBtn}
            type="button"
            onClick={() => dispatch(deleteContact(id))}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p className={styles.noContacts}>No contacts</p>
  );
};

export default ContactList;
