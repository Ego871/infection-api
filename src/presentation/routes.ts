import { Router } from 'express';
import { InfectionRoutes } from './controllers/infections/routes';

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use('/api/infections', InfectionRoutes.routes);
        return router;
    }
}