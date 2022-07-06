require('dotenv').config();
require('express-async-errors');      //Default express error handler

const express = require('express');   //import express
const app = express();
//Router
const mainRouter = require('./routes/main')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());              //this is for using the post method (req.body) !!must have otherwise throw error

app.use('/api/v1', mainRouter)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//Below server code
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
