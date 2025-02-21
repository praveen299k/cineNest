# CineNest

a movie curation app where users can search for movies using the TMDB API, add them to a watchlist, wishlist, or curated lists, and provide reviews and ratings.
I've also implemented features like sorting, searching by genre/actor/director, and displaying top-rated movies. Everything is publicly accessible.

## Features
- User authentication (registration & login)
- Movie listings with details
- Seat selection and booking
- Payment processing (future implementation)
- Admin panel for managing movies and bookings

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JWT
- **Testing:** Jest & Supertest

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/movie-booking-api.git
   cd movie-booking-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file and add:
   ```
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```
4. Run migrations and seed data:
   ```sh
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints
### Auth
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user and get JWT token

### Movies
- `GET /movies` - Get all movies
- `GET /movies/:id` - Get movie details

### Bookings
- `POST /bookings` - Create a new booking
- `GET /bookings/:id` - Get booking details

## Testing
Run tests using:
```sh
npm test
```

