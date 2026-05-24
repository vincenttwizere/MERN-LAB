import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';

// importing Routes
import movieRoutes from "./Routes/movieRoutes.js"; 
import authRoutes from "./Routes/authRoutes.js";

await connectDB();

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/movies', movieRoutes); 
app.use('/auth', authRoutes); 

const PORT = 5001;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
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