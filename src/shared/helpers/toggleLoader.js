import $ from 'cash-dom';

const toggleLoader = (setLoading) => {
  const loader = $('.loader');

  setLoading
    ? [
        loader.removeClass('is-hidden'),
        $('.timeline').addClass('is-hidden'),
        $('.profile').addClass('is-hidden'),
      ]
    : [
        loader.addClass('is-hidden'),
        $('.timeline').removeClass('is-hidden'),
        $('.profile').removeClass('is-hidden'),
      ];
};

export default toggleLoader;
