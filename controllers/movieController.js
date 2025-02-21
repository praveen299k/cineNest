const axiosInstance = require("../lib/axios.js");
const { searchMovie, getActors } = require("../services/index");

// 'actors': 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ken Watanabe, Tom Hardy, Elliot Page',

const searchMovieController = async (req, res) => {
  if (!req.query) {
    return res.status(400).json({ error: "provide query" });
  }
  try {
    const { query } = req.query;
    const response = await searchMovie(query);

    const movies = await Promise.all(
      response.results.map(async (result) => {
        const casts = (await getActors(result.id)) || [];
        return {
          title: result.title,
          tmdbId: result.id,
          genre: result.genre_ids.join(", "),
          actors: casts
            .filter((res) => res.known_for_department === "Acting")
            .map((res) => res.name)
            .join(", "),
          releaseYear: result.release_date.split("-")[0],
          rating: result.vote_average,
          description: result.overview,
        };
      })
    );

    res.json({ movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { searchMovieController };
