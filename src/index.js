import express from 'express';
import session from 'express-session';
import expressGraphQL from 'express-graphql';

import dbConfig from './db_config';
import mongoose from 'mongoose';
import './models/index';
import schema from './schema/schema';

import passport from 'passport';
import './services/auth_service';

import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

const app = express();

const mongoURI = `mongodb://${dbConfig.user}:${dbConfig.password}@ds137650.mlab.com:37650/sofarojo-visit-notes`;
// Mongoose's built in promise library is deprecated.
// Must be replaced with ES2015 Promise
mongoose.Promise = global.Promise;

mongoose.connect(mongoURI, {
    useMongoClient: true
});
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));


app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'aaabbbccc',
    store: new MongoStore({
        url: mongoURI,
        autoReconnect: true
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening on port 4000...')
});

export { app };