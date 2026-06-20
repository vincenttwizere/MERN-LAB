import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from './config/db.js';
import { swaggerDocument } from './swagger.js';

// importing Routes
import movieRoutes from "./Routes/movieRoutes.js"; 
import authRoutes from "./Routes/authRoutes.js";
import watchlistRoutes from "./Routes/watchlistRoutes.js";

await connectDB();

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// CORS support for frontend
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.use('/movies', movieRoutes);
app.use('/auth', authRoutes);
app.use('/watchlist', watchlistRoutes);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Express error:', err);

  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON payload' });
  }

  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);

    server.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);

    server.close(() => {
        process.exit(1);
    });
});

// Graceful shutdown on Ctrl+C
process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully...');

    server.close(() => {
        process.exit(0);
    });
});

export default app;