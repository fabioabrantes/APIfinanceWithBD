import {prisma} from '../database/repositoryClient';

import { getBalance } from '../utils/extractor';

type Params = {
  id:string;
}

export class BalanceByClientCaseUser{

  async execute({id}:Params):Promise<number>{

    const transactions = await prisma.transaction.findMany({
      where:{
        clientId:id
      },
    });
    
    const extrato = getBalance(transactions);
    
    return extrato;
  }
}