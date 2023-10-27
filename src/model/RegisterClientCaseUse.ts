import {prisma} from '../database/repositoryClient';

type Params ={
  cpf:string;
  name:string
}
export class RegisterClientCaseUse{

  async execute({cpf,name}:Params){
    //validação dos campos

    // verificar se o client já está cadastrado
    const client = prisma.client.findUnique({
      where:{
        cpf
      }
    })
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
   
     });
   
     return ClientNew
  }
}