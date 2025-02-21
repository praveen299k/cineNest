const {
  movie: movieModel,
  watchlist: watchlistModel,
  wishlist: wishlistModel,
  review: reviewModel,
  curatedList: curatedListModel,
  curatedListItem: curatedListItemModel,
} = require("../models");
const { Op } = require("@sequelize/core");
const { createSlug } = require("../utils");
const {
  validateCuratedListReqBody,
  validateCuratedListItemsReqBody,
  validateReviewReqBody,
  validateSearchMovieQueryParams,
  validateSortMovieQueryParams,
} = require("../validations");
const {
  movieExistsInDB,
  fetchMovieAndCastDetails,
  curatedListExistsInDB,
  movieExistsInCuratedList,
} = require("../services");

// MS1_Assignment_2.3: Creating and Managing Curated Lists

const createCuratedList = async (req, res) => {
  const errors = validateCuratedListReqBody(req.body);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  try {
    let { name, description, slug } = req.body;
    if (!slug) {
      slug = createSlug(name);
    }

    await curatedListModel.create({ name, description, slug });
    res.status(201).json({ message: "Curated list created successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating curatedList", error: error.message });
  }
};

const updateCuratedList = async (req, res) => {
  const errors = validateCuratedListReqBody(req.body);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  try {
    let { name, description } = req.body;
    let curatedListId = parseInt(req.params.curatedListId);

    let slug = createSlug(name);

    const curatedList = await curatedListModel.findByPk(curatedListId);
    if (!curatedList) {
      return res.status(404).json({ message: "No curatedList found!" });
    }
    curatedList.set({
      name,
      description,
      slug,
    });
    await curatedList.save();
    res.status(200).json({ message: "Curated list updated successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating curatedList", error: error.message });
  }
};

// MS1_Assignment_2.4: Saving Movies to Watchlist, Wishlist, and Curated Lists

const addMovieToWatchlist = async (req, res) => {
  if (!req.body.movieId) {
    return res.status(400).json({ error: "movieId is required!" });
  }
  try {
    const { movieId } = req.body;
    let movie;
    if (!(await movieExistsInDB(movieId))) {
      let movieData = await fetchMovieAndCastDetails(movieId);
      movie = await movieModel.create(movieData);
    } else {
      movie = await movieModel.findOne({ where: { tmdbId: movieId } });
    }

    await watchlistModel.create({ movieId: movie.id });
    res.status(201).json({
      message: "Movie added to watchlist successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding movie to watchlist",
      error: error.message,
    });
  }
};

const addMovieToWishlist = async (req, res) => {
  if (!req.body.movieId) {
    return res.status(400).json({ error: "movieId is required!" });
  }
  try {
    const { movieId } = req.body;
    let movie;
    if (!(await movieExistsInDB(movieId))) {
      let movieData = await fetchMovieAndCastDetails(movieId);
      movie = await movieModel.create(movieData);
    } else {
      movie = await movieModel.findOne({ where: { tmdbId: movieId } });
    }

    await wishlistModel.create({ movieId: movie.id });
    res.status(201).json({
      message: "Movie added to wishlist successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding movie to wishlist",
      error: error.message,
    });
  }
};

const addMovieToCuratedList = async (req, res) => {
  const errors = validateCuratedListItemsReqBody(req.body);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  try {
    const { movieId, curatedListId } = req.body;
    if (!(await curatedListExistsInDB(curatedListId))) {
      return res.status(400).json({
        message: "curatedList with provided id does not exists in DB",
      });
    }
    if (await movieExistsInCuratedList(movieId, curatedListId)) {
      return res.status(400).json({
        messge: "movie has already been present in provided curatedList",
      });
    }
    let movie;
    if (!(await movieExistsInDB(movieId))) {
      let movieData = await fetchMovieAndCastDetails(movieId);
      movie = await movieModel.create(movieData);
    } else {
      movie = await movieModel.findOne({ where: { tmdbId: movieId } });
    }

    await curatedListItemModel.create({ curatedListId, movieId: movie.id });
    res.status(201).json({
      message: "Movie added to curatedList successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding movie to curatedList",
      error: error.message,
    });
  }
};

// MS1_Assignment_2.5: Adding Reviews and Ratings to Movies
const addReviewAndRating = async (req, res) => {
  const errors = validateReviewReqBody(req.body);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  try {
    const { rating, reviewText } = req.body;
    const movieId = req.params.movieId;
    const movie = await movieModel.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ message: "movie not found" });
    }
    await reviewModel.create({ movieId, rating, reviewText });
    res.status(201).json({
      message: "Review added successfully.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add review", error: error.message });
  }
};

// MS1_Assignment_2.6: Searching Lists by Genre and Actor

const searchMovieByGenreAndActor = async (req, res) => {
  const errors = validateSearchMovieQueryParams(req.query);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  try {
    const { genre, actor } = req.query;
    const movies = await movieModel.findAll({
      where: {
        genre: {
          [Op.substring]: genre,
        },
        actors: {
          [Op.substring]: actor,
        },
      },
    });

    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found." });
    }
    res.status(200).json({ movies });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching movie details", error: error.message });
  }
};

// MS1_Assignment_2.7: Sorting by Ratings or Year of Release
const sortMovies = async (req, res) => {
  const errors = validateSortMovieQueryParams(req.query);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  try {
    let { list, sortBy, order } = req.query;
    order = order || "ASC";
    let moviesData;
    if (list === "watchlist") {
      moviesData = await watchlistModel.findAll({
        include: { model: movieModel },
        order: [[movieModel, sortBy, order]],
      });
    } else if (list === "wishlist") {
      moviesData = await wishlistModel.findAll({
        include: { model: movieModel },
        order: [[movieModel, sortBy, order]],
      });
    } else if (list === "curatedList") {
      moviesData = await curatedListItemModel.findAll({
        include: { model: movieModel },
        order: [[movieModel, sortBy, order]],
      });
    }

    const movies = moviesData.map((data) => ({
      title: data.movie.title,
      tmdbId: data.movie.tmdbId,
      genre: data.movie.genre,
      actors: data.movie.actors,
      releaseYear: data.movie.releaseYear,
      rating: data.movie.rating, // Ensures rating precision to 1 decimal place
    }));

    if (!movies.length) {
      return res.status(404).json({ message: "no movies found." });
    }
    res.status(200).json({ movies });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error sorting movies", error: error.message });
  }
};

// MS1_Assignment_2.8: Get Top 5 Movies by Rating + Detailed Review
const getTopMovies = async (req, res) => {
  try {
    const moviesData = await movieModel.findAll({
      attributes: ["title", "rating"],
      include: {
        model: reviewModel,
        attributes: ["reviewText"],
      },
      limit: 5,
    });

    const movies = moviesData.map((data) => {
      // console.log(data.review);
      return {
        title: data.title,
        rating: data.rating,
        review: {
          text: data.reviews[0]?.reviewText,
          wordCount: data.reviews[0]?.reviewText.trim().split(" ").length,
        },
      };
    });
    res.status(200).json({ movies });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching movies data", error: error.message });
  }
};

module.exports = {
  createCuratedList,
  updateCuratedList,
  addMovieToWatchlist,
  addMovieToWishlist,
  addMovieToCuratedList,
  addReviewAndRating,
  searchMovieByGenreAndActor,
  sortMovies,
  getTopMovies,
};
