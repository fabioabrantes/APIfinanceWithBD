import express, {Request, Response,NextFunction} from 'express';
import { v4 as uuidv4 } from 'uuid';

import {getBalance} from './utils/extractor';
import {prisma} from './database/prismaClient';

export type Transaction = {
  type:string;
  date: Date;
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

// middleware
function verifyIfExistsAccountCPF(req:Request, resp:Response,next:NextFunction,){
  const {cpf} = req.headers;  
  const ClientExists = clients.find((client)=>client.cpf === cpf);

    if(!ClientExists){
      return resp.status(400).json({message:'Error: not client exists'})
    }
    req.client = ClientExists;
    next();
}

/*** rotas relcionada a entidade cliente */
app.post('/clientsAccount',(request,response)=>{
  const {cpf,name} = request.body;
 
  const ClientNew = prisma.client.create({
    data:{
      cpf,
      name,
    }
  })

  return response.status(201).json(ClientNew)

});

app.delete('/clientsAccount',verifyIfExistsAccountCPF, (req, res)=>{
  
  const ClientExists = clients.findIndex((client)=>client.cpf === req.client.cpf);
  if(ClientExists === -1){
    return res.status(400).json({message:"cliente não existe"})
  }

  clients.splice(ClientExists,1);

  return res.status(200).json({message:"cliente removido"})

});

app.get('/account/alls', (req, res) => {
  return res.status(200).json(clients);
});


/*** rotas relacionada a entidade transactions */
app.post('/transactions',verifyIfExistsAccountCPF, (request,response)=>{
  
  const {amount,type} = request.body;
 
  const transaction: Transaction = {
    type,
    date: new Date(),
    amount
  }
  request.client.statements.push(transaction);

  const resultado = {
    transaction,
    client: request.client
  }
  return response.status(201).json(resultado);

});

app.get('/transactions',verifyIfExistsAccountCPF,(request,response) => {
  return response.status(200).json(request.client.statements);

});

app.get('/balance',verifyIfExistsAccountCPF,(request,response) => {
  const balance = getBalance(request.client.statements);
  return response.status(200).json({extrato:balance});

});



app.listen(3334, ()=>{console.log("server online on port 3334");});