import { Router } from 'express';
import { InfectionController } from './controller';

export class InfectionRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new InfectionController();
        router.get('/', controller.getInfections);
        router.get('/last-week', controller.getLastWeekInfections);
        router.post('/', controller.registerInfection);
        router.put('/:id', controller.updateInfection);
        router.delete('/:id', controller.deleteInfection);
        return router;
    }
}