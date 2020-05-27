import $ from 'cash-dom';
import formatDate from '../shared/helpers/formatDate';

const PullRequestItem = (eventData, index) => {
  const {
    actor: { avatar_url, login },
    payload: {
      action,
      pull_request: {
        html_url: pull_url = '',
        user: { html_url: url = '' },
        base: {
          repo: { html_url: repo_url = '' },
        },
      },
    },
    repo: { name },
    created_at,
  } = eventData;

  const primary =
    index === 0
      ? `<div class="timeline-item is-primary">
        <div class="timeline-marker is-primary"></div>`
      : `<div class="timeline-item">
      <div class="timeline-marker"></div>`;

  const DOM = `
    ${primary}
    <div class="timeline-content">
        <p class="heading">${formatDate(created_at)}</p>
        <div class="content">
            <span class="gh-username">
                <img src="${avatar_url}"/>
                <a href="${url}">${login}</a>
            </span>
        ${action}
        <a href="${pull_url}">pull request</a>
        <p class="repo-name">
            <a href="${repo_url}">${name}</a>
        </p>
        </div>
    </div>
    </div>
  `;

  const timelineHistory = $('.timeline').append(DOM);
};

export default PullRequestItem;
