import $ from 'cash-dom';
import formatDate from '../shared/helpers/formatDate';

const CommentItem = (eventData, index) => {
  const {
    actor: { avatar_url, login },
    payload: {
      action,
      pull_request: {
        user: { html_url: url = '' },
        base: {
          repo: { html_url: repo_url = '' },
        },
      },
      comment: { html_url: comment_url = '', url: pull_url = '' },
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
        <a href="${comment_url}">comment</a>
        to
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

export default CommentItem;
