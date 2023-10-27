import express from 'express';

import { routes } from './routes';

export type Transaction = {
  type:string;
  date?: Date;
  amount: number;
}
export type Client = {
  cpf:string;
  name:string;
  id:string;
  statements: Transaction[];
}

const app = express();

app.use(express.json());

app.use(routes);


app.listen(3333, ()=>{console.log("server online on port 3333");});