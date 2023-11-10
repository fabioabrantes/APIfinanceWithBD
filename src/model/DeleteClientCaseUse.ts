import {prisma} from '../database/repositoryClient';

type Params = {
  cpf:string;
}
export class DeleteClientCaseUse{

  async execute({cpf}:Params):Promise<void>{

    await prisma.client.delete({
      where:{
        cpf
      }
    });
  }
}