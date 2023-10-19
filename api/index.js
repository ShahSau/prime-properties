import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import useRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import bodyParser from 'body-parser';



dotenv.config();

const app = express();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB!!');
    })
    .catch((err) => {
        console.log(err);
    });
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
app.use(bodyParser.json());
app.use('/api/user', useRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });