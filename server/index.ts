import express, { Request, Response } from 'express';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// initialize configuration
dotenv.config();

const PORT = process.env.PORT || 8001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/:id', (req: Request, res: Response) => {
  console.log(req.params.id);
  res.send('<h1>Hi there!</h1>');
});

app.listen(PORT, () => {
  console.log('App started on port ', PORT);
});
