import {Request,Response,Router} from 'express';

import {RegisterClientController} from '../controller/RegisterClientController';

import {verifyIfExistsAccountCPF} from '../middlewares/verifyIfExistsAccountCPF';

import {prisma} from '../database/repositoryClient';

const routesClients = Router();

const registerClientController = new RegisterClientController();
routesClients.post('/clientsAccount',registerClientController.handle);
routesClients.delete('/clientsAccount',verifyIfExistsAccountCPF, async (req, res)=>{
  
  await prisma.client.delete({
    where:{
      cpf:req.client.cpf
    }
  })
 
  return res.status(200).json({message:"cliente removido"})

});
routesClients.get('/account/alls', async (req, res) => {
  const clients = await prisma.client.findMany({
    include:{
      transactions:true,
    },
  })
  return res.status(200).json(clients);
});

export {routesClients}