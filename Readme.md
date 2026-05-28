# 🎬 Movie Watchlist API

A RESTful backend API for managing movies and personal watchlists. This project allows users to register, authenticate, create movies, and manage their movie watchlists efficiently.

---

# 🚀 Features

* User Authentication (JWT)
* User Registration & Login
* Create, Read, Update, and Delete Movies
* Add Movies to Watchlist
* Update Watchlist Status
* Movie Ratings & Notes
* Protected Routes
* Swagger API Documentation
* Zod Validation
* Prisma ORM Integration

---

# 🛠️ Technologies Used

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* JWT Authentication
* Zod Validation
* Swagger Documentation

---

# 📁 Project Structure

```txt
src/
 ├── controllers/
 ├── routes/
 ├── middleware/
 ├── validations/
 ├── config/
 ├── prisma/
 ├── swagger.js
 └── server.js
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/movie-watchlist-api.git
```

## 2. Navigate Into Project

```bash
cd movie-watchlist-api
```

## 3. Install Dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_secret_key"
PORT=5000
```

---

# ▶️ Running the Project

## Development Mode

```bash
npm run dev
```

## Production Mode

```bash
npm start
```

---

# 🧬 Prisma Commands

## Generate Prisma Client

```bash
npx prisma generate
```

## Run Migrations

```bash
npx prisma migrate dev
```

## Open Prisma Studio

```bash
npx prisma studio
```

---

# 📚 API Documentation

Swagger Documentation is available at:

```txt
http://localhost:5001/api-docs
```

---

# 🔑 Authentication

Protected routes require a JWT token.

Example Header:

```http
Authorization: Bearer YOUR_TOKEN
```

---

# 🎥 Movie Endpoints

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| POST   | /api/movies     | Create Movie     |
| GET    | /api/movies     | Get All Movies   |
| GET    | /api/movies/:id | Get Single Movie |
| PUT    | /api/movies/:id | Update Movie     |
| DELETE | /api/movies/:id | Delete Movie     |

---

# 👤 Authentication Endpoints

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |

---

# 📌 Watchlist Endpoints

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | /api/watchlist     | Add to Watchlist      |
| GET    | /api/watchlist     | Get User Watchlist    |
| PUT    | /api/watchlist/:id | Update Watchlist Item |
| DELETE | /api/watchlist/:id | Remove from Watchlist |

---

# ✅ Example Movie Request

```json
{
  "title": "Interstellar",
  "overview": "A team of explorers travel through a wormhole in space to save humanity.",
  "releaseYear": 2014,
  "genre": ["Sci-Fi", "Adventure"],
  "runtime": 169,
  "posterUrl": "https://example.com/poster.jpg",
  "createdBy": "user123"
}
```

---

# 🧪 Testing

You can test the API using:

* Postman
* Swagger UI
* Thunder Client

---

# 🔒 Validation

This project uses Zod for request validation to ensure clean and secure data handling.

---

# 📈 Future Improvements

* Search & Filtering
* Pagination
* Favorites Feature
* Movie Recommendations
* Role-Based Authorization
* Cloud Image Uploads

---

# 👨‍💻 Author

Vincent Twizere
---

# 📄 License

This project is licensed under the MIT License.
