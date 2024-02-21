import express from 'express';
import bodyParser from 'body-parser';
import logger from './src/utils/logger.js';
import postRouter from './src/routes/postRouter.js';
import userRouter from './src/routes/userRouter.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const port = process.env.API_PORT || 3000;
const app = express();
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));


app.get('/health', (req, res) => {
    res.status(200).send('I am very healthy💪');
});

//routes
app.use('/api', postRouter);
app.use('/api', userRouter);

app.listen(port, () => {
    logger.info(`server running on http://localhost:${port} `);
})