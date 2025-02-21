const validateCuratedListReqBody = (body) => {
  const errors = [];
  if (!body.name) {
    errors.push("name is required!");
  }
  if (!body.description) {
    errors.push("description is required!");
  }
  return errors;
};

const validateCuratedListItemsReqBody = (body) => {
  const errors = [];
  if (!body.movieId) {
    errors.push("movieId is required!");
  }
  if (!body.curatedListId) {
    errors.push("curatedListId is required!");
  }
  return errors;
};

const validateReviewReqBody = (body) => {
  const errors = [];
  if (!body.rating) {
    errors.push("rating is required!");
  }
  if (
    body.rating &&
    (typeof body.rating !== "number" || body.rating < 0 || body.rating > 10)
  ) {
    errors.push("rating must be a float between 0 and 10.");
  }
  if (!body.reviewText) {
    errors.push("reviewText is required!");
  }
  if (body.reviewText && body.reviewText.length > 500) {
    errors.push("reviewText length should be maximum of 500");
  }
  return errors;
};

const validateSearchMovieQueryParams = (query) => {
  const errors = [];
  if (!query.genre) {
    errors.push("genre is required!");
  }
  if (!query.actor) {
    errors.push("actor is required!");
  }
  return errors;
};

const validateSortMovieQueryParams = (query) => {
  const errors = [];
  if (!query.list) {
    errors.push("list is required!");
  }
  if (!query.sortBy) {
    errors.push("sortBy is required!");
  }
  return errors;
};

module.exports = {
  validateCuratedListReqBody,
  validateCuratedListItemsReqBody,
  validateReviewReqBody,
  validateSearchMovieQueryParams,
  validateSortMovieQueryParams,
};
