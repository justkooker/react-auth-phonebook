import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { addContact } from '../../redux/features/phonebook/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ContactForm.module.css';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const id = nanoid();
  const newContact = {
    name: name,
    number: number,
    id: id,
  };
  const handleChangeName = e => {
    const name = e.currentTarget.name;
    if (name === 'name') {
      setName(e.currentTarget.value);
    } else if (name === 'number') {
      setNumber(e.currentTarget.value);
    }
  };
  const checkName = data => {
    const isExistName = contacts.find(contact => contact.name === data.name);
    if (isExistName === undefined) {
      dispatch(addContact(data));
      return;
    } else {
      alert('This name is occupied');
    }
  };
  const hadleSubmitForm = e => {
    e.preventDefault();
    checkName(newContact);
    formReset();
  };
  const formReset = () => {
    setName('');
    setNumber('');
  };
  return (
    <form className={styles.form} onSubmit={hadleSubmitForm}>
      <input
        className={styles.formInput}
        onChange={handleChangeName}
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <input
        className={styles.formInput}
        onChange={handleChangeName}
        type="tel"
        name="number"
        placeholder="Number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={styles.formButton} type="submit">
        <div className={styles.btnBackground}>submit</div>
      </button>
    </form>
  );
}
export default ContactForm;
