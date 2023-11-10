import {prisma} from '../database/repositoryClient';

import Client from './entities/Client';

export class FindAllClientCaseUse{
  
  async execute():Promise<Client[]>{

    const clients = await prisma.client.findMany({
      include:{
        transactions:{
          select:{
            amount:true,
            id:true,
            type:true,
            createdAt:true
          }
        }
      },
    });
    console.log(clients)
    return clients;
  }
}