import server from './app';
import connectDb from './db';
import dotenv from 'dotenv';

//load configs from .env file
dotenv.config({path: './.env'});

// log db connection
connectDb()

const port = process.env.PORT || 5000
server.listen( 
    port,
    console.log(`Server runing on port ${port}`)
);