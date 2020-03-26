/* eslint-disable import/prefer-default-export */
export const swaggerConfig = {
  openapi: '3.0.1',
  servers: [
    {
      url: '/api/v1',
    },
  ],
  info: {
    title: 'Sport Compass test API',
    version: '1.0.0',
    description: 'A simple api',
    contact: {
      email: 'null@null.com',
    },
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
  consumes: 'application/json',
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      badRequest: {
        type: 'object',
        properties: {
          status: {
            type: 'number',
            example: 400,
          },
          error: {
            type: 'string',
          },
        },
      },
      notFound: {
        type: 'object',
        properties: {
          status: {
            type: 'number',
            example: 404,
          },
          error: {
            type: 'string',
          },
        },
      },
      serverError: {
        type: 'object',
        properties: {
          status: {
            type: 'integer',
            example: 500,
          },
          message: {
            type: 'string',
          },
        },
      },
      conflict: {
        type: 'object',
        properties: {
          status: {
            type: 'integer',
            example: 409,
          },
          message: {
            type: 'string',
          },
        },
      },
      authError: {
        type: 'object',
        properties: {
          status: {
            type: 'integer',
            example: 401,
          },
          message: {
            type: 'string',
          },
        },
      },
      forbidden: {
        type: 'object',
        properties: {
          status: {
            type: 'integer',
            example: 403,
          },
          message: {
            type: 'string',
          },
        },
      },
    },
  },
};
