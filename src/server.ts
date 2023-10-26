import express, {Request, Response,NextFunction} from 'express';

import {prisma} from './database/repositoryClient';

import {getBalance} from './utils/extractor';

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
async function verifyIfExistsAccountCPF(req:Request, resp:Response,next:NextFunction,){
  const {cpf} = req.headers as {cpf:string};  

  const ClientExists = await prisma.client.findUnique({
    where:{
      cpf
    }
  });

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
    name,
    cpf,
    transactions:{
      create:{
        type:'credit',
        amount:100
      }
    }
   },
  });

  return response.status(201).json(ClientNew)

});

app.delete('/clientsAccount',verifyIfExistsAccountCPF, (req, res)=>{
  
  prisma.client.delete({
    where:{
      cpf:req.client.cpf
    }
  })
 
  return res.status(200).json({message:"cliente removido"})

});

app.get('/account/alls', (req, res) => {
  const clients = prisma.client.findMany({
    include:{
      transactions:true,
    }
  })
  return res.status(200).json(clients);
});


/*** rotas relacionada a entidade transactions */
app.post('/transactions',verifyIfExistsAccountCPF, (request,response)=>{
  
  const {amount,type} = request.body;

  const transaction = await prisma.transaction.create({
    data: {
     amount,
     type,
      client: {
        connect: { id: request.client.id },
      },
    },
    select:{
      type,
      amount,
    }
  })


  return response.status(201).json(transaction);

});

app.get('/transactions',verifyIfExistsAccountCPF,(request,response) => {
  return response.status(200).json(request.client.statements);

});

app.get('/balance',verifyIfExistsAccountCPF,(request,response) => {
  const balance = getBalance(request.client.statements);
  return response.status(200).json({extrato:balance});

});



app.listen(3334, ()=>{console.log("server online on port 3334");});