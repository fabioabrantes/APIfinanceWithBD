import {Request,Response} from 'express';
import {BalanceByClientCaseUser} from '../model/BalanceByClientCaseUser';

export class BalanceByClientController {


  async handle(req:Request,res:Response):Promise<Response>{
    const {id} = req.client;
    
    const balanceByClientCaseUser = new BalanceByClientCaseUser();
    const extrato = await balanceByClientCaseUser.execute({id});

    
    return res.status(200).json({extrato});

  }
}