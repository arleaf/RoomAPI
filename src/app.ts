//imports express libraries
import express, { Request, Response } from 'express';
import roomsRouter from './rooms/rooms.routes';
import dotenv from "dotenv";
import logger from './middleware/middleware.logger';
import cors from 'cors';
import helmet from 'helmet';

//Creates an express app and assigns it to app variable
const app = express();
const port = 3000;

dotenv.config();
//enable all Cross-Origin Resource Sharing requests
app.use(cors());
//Parse JSON bodies
app.use(express.json());
//Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

if (process.env.NODE_ENV == 'development') {
    // add logger middleware
    app.use(logger);
    console.log(process.env.GREETING + ' in dev mode');
}
//App routes
//root route
app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Welcome to the Hotel Rooms API</h1>');
});
//adding router middleware
app.use('/', [roomsRouter]);


//This method binds the app with the specified port(3000) to listen for any connections.
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

