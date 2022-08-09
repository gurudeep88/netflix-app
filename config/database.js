import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

const MONGO_URI = `${process.env.MONGO_URI}`;

mongoose.connect(MONGO_URI)
            .then(()=>console.log('Database connected successfully'))
            .catch(e => console.log('Database connection failed', e)
            );