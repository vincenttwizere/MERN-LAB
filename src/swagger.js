export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Movie Watchlist API',
    version: '1.0.0',
    description: 'API documentation for the movie watchlist backend',
  },
  servers: [
    {
      url: 'http://localhost:5001',
      description: 'Local development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      RegisterInput: {
        type: 'object',
        required: ['username', 'email', 'password'],
        properties: {
          username: { type: 'string', example: 'johndoe' },
          email: { type: 'string', format: 'email', example: 'john@example.com' },
          password: { type: 'string', example: 'strongP@ssw0rd' },
        },
      },
      LoginInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'john@example.com' },
          password: { type: 'string', example: 'strongP@ssw0rd' },
        },
      },
      MovieCreateInput: {
        type: 'object',
        required: ['title', 'releaseYear'],
        properties: {
          title: { type: 'string', example: 'Inception' },
          overview: { type: 'string', example: 'A thief who steals corporate secrets...' },
          releaseYear: { type: 'integer', example: 2010 },
          genre: { type: 'array', items: { type: 'string' }, example: ['Sci-Fi', 'Thriller'] },
          runtime: { type: 'integer', example: 148 },
          posterUrl: { type: 'string', format: 'uri', example: 'https://image.url/poster.jpg' },
        },
      },
      MovieUpdateInput: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Inception' },
          overview: { type: 'string', example: 'A thief who steals corporate secrets...' },
          releaseYear: { type: 'integer', example: 2010 },
          genre: { type: 'array', items: { type: 'string' }, example: ['Sci-Fi', 'Thriller'] },
          runtime: { type: 'integer', example: 148 },
          posterUrl: { type: 'string', format: 'uri', example: 'https://image.url/poster.jpg' },
        },
      },
      WatchlistAddInput: {
        type: 'object',
        required: ['movieId'],
        properties: {
          movieId: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
          status: { type: 'string', enum: ['Planned', 'Watching', 'Completed', 'Dropped'] },
          rating: { type: 'integer', minimum: 0, maximum: 10, example: 8 },
          notes: { type: 'string', example: 'Must watch this weekend' },
        },
      },
      WatchlistUpdateInput: {
        type: 'object',
        properties: {
          status: { type: 'string', enum: ['Planned', 'Watching', 'Completed', 'Dropped'] },
          rating: { type: 'integer', minimum: 0, maximum: 10, example: 9 },
          notes: { type: 'string', example: 'Updated notes' },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterInput' },
            },
          },
        },
        responses: {
          '201': { description: 'User registered successfully' },
          '400': { description: 'Validation failed or user already exists' },
          '500': { description: 'Server error' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Log in with email and password',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginInput' },
            },
          },
        },
        responses: {
          '200': { description: 'Login successful' },
          '401': { description: 'Invalid email or password' },
        },
      },
    },
    '/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Log out the current user',
        responses: {
          '200': { description: 'Logout successful' },
        },
      },
    },
    '/movies/createMovie': {
      post: {
        tags: ['Movies'],
        summary: 'Create a new movie',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/MovieCreateInput' },
            },
          },
        },
        responses: {
          '201': { description: 'Movie created successfully' },
          '400': { description: 'Validation failed' },
          '401': { description: 'Unauthorized' },
          '500': { description: 'Server error' },
        },
      },
    },
    '/movies/updateMovie/{id}': {
      put: {
        tags: ['Movies'],
        summary: 'Update an existing movie',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Movie ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/MovieUpdateInput' },
            },
          },
        },
        responses: {
          '200': { description: 'Movie updated successfully' },
          '400': { description: 'Validation failed' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Movie not found' },
          '500': { description: 'Server error' },
        },
      },
    },
    '/movies/deleteMovie/{id}': {
      delete: {
        tags: ['Movies'],
        summary: 'Delete an existing movie',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Movie ID',
          },
        ],
        responses: {
          '200': { description: 'Movie deleted successfully' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Movie not found' },
          '500': { description: 'Server error' },
        },
      },
    },
    '/watchlist/addToWatchlist': {
      post: {
        tags: ['Watchlist'],
        summary: 'Add a movie to the user watchlist',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/WatchlistAddInput' },
            },
          },
        },
        responses: {
          '201': { description: 'Movie added to watchlist' },
          '400': { description: 'Validation failed' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Movie not found' },
          '500': { description: 'Server error' },
        },
      },
    },
    '/watchlist/removeFromWatchlist/{id}': {
      delete: {
        tags: ['Watchlist'],
        summary: 'Remove a movie from the watchlist',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Watchlist item ID',
          },
        ],
        responses: {
          '200': { description: 'Watchlist item removed' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Item not found' },
          '500': { description: 'Server error' },
        },
      },
    },
    '/watchlist/updateWatchlistItem/{id}': {
      put: {
        tags: ['Watchlist'],
        summary: 'Update a watchlist item',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Watchlist item ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/WatchlistUpdateInput' },
            },
          },
        },
        responses: {
          '200': { description: 'Watchlist item updated' },
          '400': { description: 'Validation failed' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Item not found' },
          '500': { description: 'Server error' },
        },
      },
    },
  },
};
