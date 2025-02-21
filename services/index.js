const axiosInstance = require("../lib/axios");
const {
  movie: movieModel,
  curatedList: curatedListModel,
  curatedListItem: curatedListItemModel,
} = require("../models");

const searchMovie = async (query) => {
  try {
    const response = await axiosInstance.get(`/search/movie?query=${query}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getActors = async (movie_id) => {
  try {
    const response = await axiosInstance.get(`/movie/${movie_id}/credits`);
    return response.data.cast;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const movieExistsInDB = async (movieId) => {
  const movie = await movieModel.findOne({ where: { tmdbId: movieId } });
  if (!movie) return false;
  return true;
};

const fetchMovieAndCastDetails = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    const { title, id, release_date, vote_average, genres, overview } =
      response.data;
    const casts = await getActors(movieId);
    const actors = [];
    for (let cast of casts) {
      if (actors.length === 5) {
        break;
      }
      if (cast.known_for_department === "Acting") {
        actors.push(cast.name);
      }
    }
    const movieAndCastDetails = {
      title,
      tmdbId: id,
      releaseYear: release_date.split("-")[0],
      rating: vote_average,
      actors: actors.join(", "),
      genre: genres.map((genre) => genre.name).join(", "),
      description: overview,
    };
    return movieAndCastDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const curatedListExistsInDB = async (curatedListId) => {
  try {
    const curatedList = await curatedListModel.findByPk(curatedListId);
    if (!curatedList) return false;
    return true;
  } catch (error) {}
};

const movieExistsInCuratedList = async (movieId, curatedListId) => {
  const movie = await curatedListItemModel.findOne({
    where: { movieId, curatedListId },
  });
  if (!movie) return false;
  return true;
};

module.exports = {
  searchMovie,
  getActors,
  movieExistsInDB,
  fetchMovieAndCastDetails,
  curatedListExistsInDB,
  movieExistsInCuratedList,
};
