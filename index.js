import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
console.log('path' + path + "filenh"+ __filename +" _dirn"+ __dirname)
//middlewares
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

//Database connection
import './config/database.js';

//routes
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/users', routes.users);
app.use('/api/v1/movie', routes.movies);
app.use('/api/v1/list', routes.lists);

const PORT = process.env.PORT || 8000

app.listen(8000, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})