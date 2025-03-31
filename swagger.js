const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Life Hacks API',
    description: 'W03 Project: Project 2 Part 1 (CRUD Operations)',
  },
  host: 'w03-project2.onrender.com',
  schemes: ['https'],
  components: {
    securitySchemes: {
      OAuth2: {
        type: 'oauth2',
        flows: {
          authorizationCode: {
            authorizationUrl: 'https://github.com/login/oauth/authorize', 
            tokenUrl: 'https://github.com/login/oauth/access_token',     
            scopes: {
              'read:user': 'Read user information',
              'user:email': 'Access user email',
            },
          },
        },
      },
    },
  },
  security: [
    {
      OAuth2: ['read:user', 'user:email'],  
    },
  ],
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
