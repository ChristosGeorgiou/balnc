import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';

const app = express();

app.use('/api', bodyParser.urlencoded({ extended: true }));
app.use('/api', bodyParser.json());
app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Server started on port: ' + port);

module.exports = app;
