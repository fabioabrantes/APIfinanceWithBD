import {Request,Response,NextFunction } from 'express';
import {prisma} from '../database/repositoryClient';

export async function verifyIfExistsAccountCPF(req:Request, resp:Response,next:NextFunction,){
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