import {Router} from 'express';

//middleware
import {verifyIfExistsAccountCPF} from '../middlewares/verifyIfExistsAccountCPF';

//controllers
import {RegisterClientController} from '../controllers/RegisterClientController';
import { DeleteClientController } from '../controllers/DeleteClientController';
import { FindAllClientsController } from '../controllers/FindAllClientsController';


const routesClients = Router();

const registerClientController = new RegisterClientController();
routesClients.post('/clientsAccount',registerClientController.handle);

const deleteClientController = new DeleteClientController();
routesClients.delete('/clientsAccount',verifyIfExistsAccountCPF, deleteClientController.handle);

const findAllClientsController = new FindAllClientsController();
routesClients.get('/account/alls', findAllClientsController.handle);

export {routesClients}