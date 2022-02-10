const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(
	cors({
		origin: '*',
		optionsSuccessStatus: 200,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
	})
);

// app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const indexRoutes = require('./routes/index');
app.use('/api', indexRoutes);

mongoose
	.connect(
		'mongodb+srv://admin:Uk2uZUDTku9z43in@mern-auth-ititech.gusxu.mongodb.net/Pratilipi?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log('[App.js] Connected To database');
	})
	.catch(err => {
		console.log(err);
	});

app.listen(8000, () => {
	console.log('[App.js] Server Started at http://localhost:8000');
});
