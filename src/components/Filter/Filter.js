import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filteredContacts } from '../../redux/features/phonebook/contactsSlice';
import styles from './Filter.module.css';
const Filter = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const onChange = e => {
    setValue(e.target.value);
    dispatch(filteredContacts(e.target.value));
  };
  return (
    <input
      className={styles.filterInput}
      onChange={onChange}
      value={value}
      placeholder="Filter"
      type="text"
      name="filter"
    ></input>
  );
};

export default Filter;
