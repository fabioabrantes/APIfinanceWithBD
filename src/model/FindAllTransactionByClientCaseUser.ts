import {prisma} from '../database/repositoryClient';
import Transaction from './entities/Transaction';

type Params ={
  id:string;
}
export class FindAllTransactionByClientCaseUser{
  
  async execute({id}:Params):Promise<Transaction[]>{

    const transactions = await prisma.transaction.findMany({
      where:{
        clientId:id
      },
    });

    return transactions;
  }
}


