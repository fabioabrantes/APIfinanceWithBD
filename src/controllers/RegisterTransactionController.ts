import {Request,Response} from 'express';
import {RegisterTransactionCaseUser} from '../model/RegisterTransactionCaseUser';

export class RegisterTransactionController {


  async handle(req:Request,res:Response):Promise<Response>{
    const {amount,type} = req.body;
    const {id} = req.client;

    const registerTransactionCaseUser = new RegisterTransactionCaseUser();
    const transaction = await registerTransactionCaseUser.execute({amount,type,id});


    return res.status(201).json(transaction);

  }
}