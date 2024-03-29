import {Request,Response} from 'express';
import {RegisterClientCaseUse} from '../model/RegisterClientCaseUse';

export class RegisterClientController {


  async handle(req:Request,res:Response):Promise<Response>{
    const {cpf,name} = req.body;

    //enviar os dados da requisição para meu caso de uso
    const registerClientCaseUse = new RegisterClientCaseUse();
    const result = await registerClientCaseUse.execute({cpf,name});


    return res.status(200).json(result);

  }
}