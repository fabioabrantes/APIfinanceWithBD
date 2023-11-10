import {Router} from 'express';

//middleware
import {verifyIfExistsAccountCPF} from '../middlewares/verifyIfExistsAccountCPF';

import { RegisterTransactionController } from '../controllers/RegisterTransactionController';
import { FindAllTransactionsByClientController } from '../controllers/FindAllTransactionsByClientController';
import { BalanceByClientController } from '../controllers/BalanceByClientController';


 const routesTransactions = Router();


const registerTransactionController = new RegisterTransactionController();
routesTransactions.post('/transactions',verifyIfExistsAccountCPF,registerTransactionController.handle);

const findAllTransactionsByClientController = new FindAllTransactionsByClientController();
routesTransactions.get('/transactions',verifyIfExistsAccountCPF, findAllTransactionsByClientController.handle);

const balanceByClientController = new BalanceByClientController();
routesTransactions.get('/balance',verifyIfExistsAccountCPF,balanceByClientController.handle);

export {routesTransactions}