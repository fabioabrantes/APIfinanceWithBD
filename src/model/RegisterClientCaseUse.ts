import {prisma} from '../database/repositoryClient';

import Client from './entities/Client';

type Params ={
  cpf:string;
  name:string
}
export class RegisterClientCaseUse{

  async execute({cpf,name}:Params):Promise<Client | {message:string}>{
    //validação dos campos

    // verificar se o client já está cadastrado
    const client = await prisma.client.findUnique({
      where:{
        cpf
      }
    })
    console.log(client)
    if(client !== null){
      return {message:'client já existe'}
    }
    const ClientNew = await prisma.client.create({
      data:{
       cpf,
       name,
       transactions:{
         create:{
           type:'credits',
           amount:100
         }
       }
      },
      include:{
        transactions:true,
      }
   
     });
   
     return ClientNew
  }
}