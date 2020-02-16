const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const db = require('./queries');
const app = express();
const port = 3000;



//limit the body payload
app.use(express.json({ limit: '10kb' }));

//express http headers package
app.use(helmet());

//request limit. 100 per hour.
const limit = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests'
});
app.use('/profiles', limit);




app.get('/', (request, response) => {
  response.json({ info: 'Personas API' })
});

app.get('/profiles', db.getProfiles);
app.get('/profiles/:id', db.getProfileById);
app.post('/profiles/:id', db.createProfile);
app.put('/profiles/:id', db.updateProfile);
app.delete('/profiles/:id', db.deleteProfile);

app.listen(port, () => {
  console.log(`App is running on port ${port}.`);
});
