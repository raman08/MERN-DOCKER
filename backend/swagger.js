const swaggerAutogen = require('swagger-autogen')();

const doc = {
	info: {
		title: 'Pratilipi',
	},
	host: 'localhost:8000',
	schemes: ['http', 'https'],
	tags: [
		{
			name: 'Auth',
			description: 'This contains authentication related endpoints',
		},
		{
			name: 'Content',
			description: 'This contains content related endpoints',
		},
	],
	securityDefinitions: {
		bearerAuth: {
			type: 'apiKey',
			scheme: 'bearer',
			bearerFormat: 'JWT',
			in: 'header',
			name: 'Authorization',
		},
	},
};

const outputFile = 'swagger.json';
const endpointsFiles = ['app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
