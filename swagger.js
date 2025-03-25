const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Life Hacks API',
    description: 'W03 Project: Project 2 Part 1 (CRUD Operations)' 
},
  host: 'localhost:5050',
  schemes: ['https', 'http']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
