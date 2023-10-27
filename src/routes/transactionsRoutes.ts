import {Router} from 'express';
import {prisma} from '../database/repositoryClient';

import {verifyIfExistsAccountCPF} from '../middlewares/verifyIfExistsAccountCPF';

import { getBalance } from '../utils/extractor';

 const routesTransactions = Router();
/*** rotas relacionada a entidade transactions */
routesTransactions.post('/transactions',verifyIfExistsAccountCPF, async (request,response)=>{
  
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
      type:true,
      amount:true,
    }
  })


  return response.status(201).json(transaction);

});

routesTransactions.get('/transactions',verifyIfExistsAccountCPF,async (request,response) => {
    const transactions = await prisma.transaction.findMany({
      where:{
        clientId:request.client.id
      },
      select:{
        type:true,
        amount:true
      }
    });
  
  return response.status(200).json(transactions);

});

routesTransactions.get('/balance',verifyIfExistsAccountCPF,async (request,response) => {
  const transactions = await prisma.transaction.findMany({
    where:{
      clientId:request.client.id
    },
  });
  
  const balance = getBalance(transactions);
  return response.status(200).json({extrato:balance});

});

export {routesTransactions}