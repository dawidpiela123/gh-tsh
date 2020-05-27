import './assets/scss/app.scss';
import $ from 'cash-dom';

import githubApi from './services/githubService';
import usernameRegex from './shared/constants/usernameRegex';
import eventTypes from './shared/constants/eventTypes';
import validateUsername from './shared/helpers/usernameValidation';
import CommentItem from './components/Comment';
import PullRequestItem from './components/PullRequest';
import toggleLoader from './shared/helpers/toggleLoader';

const App = () => {
  let profile = null;
  let history = null;

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
      toggleLoader(true);

      githubApi
        .fetchUserData(userNameInput.val())
        .then((response) => {
          if (response.status === 404) {
            $('.profile-text').text('User not found');
          } else {
            $('.profile-text').text('Profile');
          }

          return response.json();
        })
        .then((body) => {
          profile = body;

          githubApi
            .fetchUserEvents(userNameInput.val())
            .then((response) => {
              toggleLoader(false);
              return response.json();
            })
            .then((body) => {
              history = body.filter((event) => eventTypes.includes(event.type));

              updateHistory();
            });

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

  const updateHistory = () => {
    const timelineHistory = $('.timeline');
    timelineHistory.text('');
    if (history.length > 0) {
      history.map((event, index) => {
        if (event.type === 'PullRequestEvent') {
          PullRequestItem(event, index);
        } else if (event.type === 'PullRequestReviewCommentEvent') {
          CommentItem(event, index);
        }
      });
    } else {
      timelineHistory.text(
        `User ${profile.login} has no history with given event types`
      );
    }
  };

  initializeApp();
};

export default App;
