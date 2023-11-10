import {Request,Response} from 'express';
import {FindAllClientCaseUse} from '../model/FindAllClientCaseUse';

export class FindAllClientsController {


  async handle(req:Request,res:Response):Promise<Response>{
    
    const findAllClientCaseUse = new FindAllClientCaseUse();

    const clients = await findAllClientCaseUse.execute();

    return res.status(200).json(clients);

  }
}