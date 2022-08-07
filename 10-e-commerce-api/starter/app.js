require('dotenv').config();
require('express-async-errors')

//express
const express = require('express')
const app = express();

//rest of the packages
const morgan = require('morgan')                //a logger that prints special command on console.log
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
//database
const connectDB = require('./db/connect');      //connect to the database

//  routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


app.use(morgan('tiny'));
app.use(express.json());                         //gain access to json file through express
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.send('<h1>HOME PAGE</h1>')
})

app.get('/api/v1', (req, res) => {
    console.log(req.signedCookies)
    res.send('Cookie printed')
})
//use routers
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
//error handler
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// server 5000
const port = process.env.MONGO_URI || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }

}

start()