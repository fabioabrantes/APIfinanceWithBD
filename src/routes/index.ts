import {Router} from 'express';
import { routesClients } from './clientRoutes';
import { routesTransactions } from './transactionsRoutes';

const routes = Router();

routes.use(routesClients);
routes.use(routesTransactions);

export {routes};