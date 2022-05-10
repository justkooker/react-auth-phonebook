import axios from 'axios';
axios.defaults.baseURL = 'https://connections-api.herokuapp.com';
const token = {
  set(token) {
    axios.defaults.headers.common['Authorization'] = token;
  },
  unset() {
    axios.defaults.headers.common['Authorization'] = '';
  },
};
const fetchSignup = async ({ name, email, password }) => {
  try {
    const response = await axios.post('/users/signup', {
      name,
      email,
      password,
    });
    token.set(response.data.token);
    return response;
  } catch (error) {
    console.log(error);
  }
};
const fetchLogin = async ({ email, password }) => {
  try {
    const response = await axios.post('/users/login', {
      email,
      password,
    });
    token.set(response.data.token);

    return response;
  } catch (error) {
    console.log(error);
  }
};
const fetchLogout = async () => {
  try {
    const response = await axios.post('/users/logout');
    if (response.status === 200) {
      token.unset();
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};
const fetchCurrentUser = async toke => {
  try {
    token.set(toke);
    const response = await axios.get('/users/current');
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
const fetchContacts = async () => {
  try {
    const response = await axios.get('/contacts');
    return response;
  } catch (error) {
    console.log(error);
  }
};
const fetchDeleteContact = async id => {
  try {
    const response = await axios.delete(`/contacts/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
const fetchAddContact = async ({ name, number }) => {
  try {
    const response = await axios.post('/contacts', {
      name,
      number,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export default {
  fetchSignup,
  fetchLogin,
  fetchLogout,
  fetchContacts,
  fetchDeleteContact,
  fetchAddContact,
  fetchCurrentUser,
};
