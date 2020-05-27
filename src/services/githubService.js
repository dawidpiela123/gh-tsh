import { polyfill } from 'es6-promise';
import 'isomorphic-fetch';
import API_KEY from './api';

polyfill();

const fetchUserData = (userName) => fetch(`${API_KEY}${userName}`);

export default fetchUserData;
