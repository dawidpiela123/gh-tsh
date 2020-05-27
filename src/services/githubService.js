import { polyfill } from 'es6-promise';
import 'isomorphic-fetch';
import API_KEY from './api';

polyfill();

export default {
  fetchUserData: (userName) => fetch(`${API_KEY}${userName}`),

  fetchUserEvents: (userName) =>
    fetch(`https://api.github.com/users/${userName}/events/public`),
};
