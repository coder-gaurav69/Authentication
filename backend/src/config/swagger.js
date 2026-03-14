const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth & Task API',
      version: '1.0.0',
      description: 'API Documentation for the internship assignment',
    },
    servers: [
      {
        url: '/api/v1',
        description: 'Automatic Discovery (Production/Local)',
      },
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Manual Local Backend',
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
    },
    paths: {
      '/auth/register': {
        post: {
          summary: 'Register a new user',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password'],
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                    role: { type: 'string', enum: ['user', 'admin'] }
                  }
                }
              }
            }
          },
          responses: { 201: { description: 'User created' } }
        }
      },
      '/auth/login': {
        post: {
          summary: 'Login user',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: { 200: { description: 'Login success' } }
        }
      },
      '/auth/me': {
        get: {
          summary: 'Get current logged in user',
          tags: ['Auth'],
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'User data' } }
        }
      },
      '/auth/logout': {
        get: {
          summary: 'Logout user',
          tags: ['Auth'],
          responses: { 200: { description: 'Logout success' } }
        }
      },
      '/auth/users': {
        get: {
          summary: 'Get all users (Admin only)',
          tags: ['Auth'],
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'List of users' } }
        }
      },
      '/tasks': {
        get: {
          summary: "Get all tasks (User's or All if Admin)",
          tags: ['Tasks'],
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'List of tasks' } }
        },
        post: {
          summary: 'Create a new task',
          tags: ['Tasks'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['title', 'description'],
                  properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    status: { type: 'string', enum: ['todo', 'doing', 'done'] }
                  }
                }
              }
            }
          },
          responses: { 201: { description: 'Task created' } }
        }
      },
      '/tasks/{id}': {
        get: {
          summary: 'Get single task',
          tags: ['Tasks'],
          parameters: [{ in: 'path', name: 'id', required: true }],
          responses: { 200: { description: 'Task data' } }
        },
        put: {
          summary: 'Update task',
          tags: ['Tasks'],
          parameters: [{ in: 'path', name: 'id', required: true }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    status: { type: 'string', enum: ['todo', 'doing', 'done'] }
                  }
                }
              }
            }
          },
          responses: { 200: { description: 'Task updated' } }
        },
        delete: {
          summary: 'Delete task',
          tags: ['Tasks'],
          parameters: [{ in: 'path', name: 'id', required: true }],
          responses: { 200: { description: 'Task deleted' } }
        }
      }
    }
  },
  apis: [],
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;
