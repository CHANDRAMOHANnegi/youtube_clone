const express = require('express');
const bodyParser = require('body-parser')
const path = require("path");
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config('./env');

const graphqlHttp = require('express-graphql');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const isAuth = require('./middleware/auth');
const videoRouter = require('./routes/videos');
const app = express();
const models = require('./database/models/index');

models.sequelize.sync().then(() => {
  console.log("Drop========================================== and re-sync db.");
  require('./database/bootstrap')();
}).catch(err => {
  // console.log("---------------------------------------------");
  console.log(err)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log('---------------------------', process.env.DB_DATABASE);

// app.use(isAuth);
app.use(cors());

app.use('/video', videoRouter);

app.use('/api', graphqlHttp({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true,
  customFormatErrorFn: (error) => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path,
  })
}));


app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.use('*', (req, res, next) => {
    res.sendfile(path.join(__dirname, '../client/build/index.html'));
  });
}

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});