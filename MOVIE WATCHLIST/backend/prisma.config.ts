import dotenv from 'dotenv';
import { defineConfig } from '@prisma/config';

dotenv.config();

export default defineConfig({
  datasource: {
    provider: 'postgresql',
    url: process.env.DATABASE_URL,
  },
});

