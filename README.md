# cineNest

## Overview
This is a **Movie Curation App** backend that allows users to search for movies using the **TMDB API**, add them to different lists, and provide reviews and ratings. The app includes features like sorting, searching by genre/actor/director, and displaying top-rated movies. Everything is publicly accessible, meaning users do not need an account to explore movies and interact with the app.

## Features
- **Movie Search**: Users can search for movies using the TMDB API.
- **Curated Lists**: Users can add movies to a watchlist, wishlist, or custom curated lists.
- **Sorting & Filtering**: Movies can be sorted and searched by genre, actor, or director.
- **Ratings & Reviews**: Users can provide reviews and ratings for movies.
- **Top-Rated Movies**: A section displaying the top-rated movies.
- **Public Accessibility**: No authentication is required to browse and interact with movies.

## Technologies Used
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL (for storing curated lists, reviews, and ratings)
- **API**: TMDB API (for fetching movie data)

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movie-curation-app.git
   cd movie-curation-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your TMDB API key:
   ```env
   TMDB_API_KEY=your_tmdb_api_key
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

## API Endpoints
### Movie Search
- `GET /api/movies/search` - Search for movies using TMDB API.
- `GET /api/movies/searchByGenreAndActor` - Search movies by genre and actor.

### Curated Lists
- `POST /api/curated-lists` - Create a new curated list.
- `PUT /api/curated-lists/:curatedListId` - Update an existing curated list.
- `POST /api/movies/curated-list` - Add a movie to a curated list.

### Watchlist & Wishlist
- `POST /api/movies/watchlist` - Add a movie to the watchlist.
- `POST /api/movies/wishlist` - Add a movie to the wishlist.

### Reviews & Ratings
- `POST /api/movies/:movieId/reviews` - Add a review and rating for a movie.

### Sorting & Top Movies
- `GET /api/movies/sort` - Sort movies based on criteria.
- `GET /api/movies/top5` - Get the top 5 rated movies.

## API Configuration
To fetch movie data, you need an API key from TMDB:
1. Sign up at [TMDB](https://www.themoviedb.org/).
2. Generate an API key from your account settings.
3. Add the key to your `.env` file as shown above.

## Usage
- **Search Movies**: Make requests to the backend to fetch movie data.
- **Add to Lists**: Store movie data in watchlists, wishlists, or curated lists.
- **Rate & Review**: Submit ratings and reviews via API requests.
- **Sort & Filter**: Use API endpoints to filter movies by genre, actor, or director.
- **Explore Top-Rated Movies**: Retrieve and display top-rated movies from TMDB.

## Screenshots
You can view project screenshots at the following link:
[Project Screenshots](https://docs.google.com/document/d/1A-2G3RhX_GAKpAkJeVfUuC1-rgovuAhkTrpNyd82FtQ/edit?usp=sharing)

## Acknowledgments
- **TMDB API** for providing movie data.

