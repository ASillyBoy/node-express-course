const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const port = process.env.PORT || 3000

const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


//middleware
app.use(express.static('./public'))
app.use(express.json());

//routes

app.use('/api/v1/tasks', tasks)             //main function file

app.use(notFound)                           //error handler on invalid url
app.use(errorHandlerMiddleware)             //error handler on invalid payload


//Server connection code
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(` Server is listening on port ${port}...`);
        })

    } catch (error) {
        console.log(error)
    }
}

start()

