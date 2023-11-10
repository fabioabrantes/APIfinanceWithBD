import {Request,Response} from 'express';
import {FindAllTransactionByClientCaseUser} from '../model/FindAllTransactionByClientCaseUser';

export class FindAllTransactionsByClientController {


  async handle(req:Request,res:Response):Promise<Response>{
    const {id} = req.client;

    const findAllTransactionByClientCaseUser = new FindAllTransactionByClientCaseUser();
    const transactions = await findAllTransactionByClientCaseUser.execute({id});

    return res.status(200).json(transactions);

  }
}