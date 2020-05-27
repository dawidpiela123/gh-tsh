const validateUsername = (username, input, button, regex) => {
  if (regex.test(username)) {
    input.removeClass('is-danger');
    button.removeAttr('disabled');
  } else {
    input.addClass('is-danger');
    button.attr('disabled', true);
  }
};

export default validateUsername;
