require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { searchMovieController } = require("./controllers/movieController");
const {
  createCuratedList,
  updateCuratedList,
  addMovieToWatchlist,
  addMovieToWishlist,
  addMovieToCuratedList,
  addReviewAndRating,
  searchMovieByGenreAndActor,
  sortMovies,
  getTopMovies,
} = require("./controllers/dataController");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/movies/search", searchMovieController);
app.post("/api/curated-lists", createCuratedList);
app.put("/api/curated-lists/:curatedListId", updateCuratedList);
app.post("/api/movies/watchlist", addMovieToWatchlist);
app.post("/api/movies/wishlist", addMovieToWishlist);
app.post("/api/movies/curated-list", addMovieToCuratedList);
app.post("/api/movies/:movieId/reviews", addReviewAndRating);
app.get("/api/movies/searchByGenreAndActor", searchMovieByGenreAndActor);
app.get("/api/movies/sort", sortMovies);
app.get("/api/movies/top5", getTopMovies);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
