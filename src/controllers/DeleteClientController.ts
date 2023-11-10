import {Request,Response} from 'express';
import {DeleteClientCaseUse} from '../model/DeleteClientCaseUse';

export class DeleteClientController {


  async handle(req:Request,res:Response):Promise<Response>{
    const {cpf} = req.client;

    const deleteClientCaseUse = new DeleteClientCaseUse();
    await deleteClientCaseUse.execute({cpf});
    
    return res.status(200).json({message:"cliente removido"})

  }
}