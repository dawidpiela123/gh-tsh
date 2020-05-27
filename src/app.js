import './assets/scss/app.scss';
import $ from 'cash-dom';

import fetchUserData from './services/githubService';
import usernameRegex from './shared/constants/usernameRegex';
import validateUsername from './shared/helpers/usernameValidation';

const App = () => {
  let profile = null;

  const initializeApp = () => {
    const userNameInput = $('input#username');
    const loadButton = $('button#load');

    userNameInput.on('keyup', (e) => {
      validateUsername(
        userNameInput.val(),
        userNameInput,
        loadButton,
        usernameRegex
      );
    });

    $('.load-username').on('click', (_e) => {
      fetchUserData(userNameInput.val())
        .then((response) => response.json())
        .then((body) => {
          profile = body;
          updateProfile();
        });
    });
  };

  const updateProfile = () => {
    $('#profile-name').text($('.username.input').val());
    $('#profile-image').attr('src', profile.avatar_url);
    $('#profile-url').attr('href', profile.html_url).text(profile.login);
    $('#profile-bio').text(profile.bio || '(no information)');
  };

  initializeApp();
};

export default App;
