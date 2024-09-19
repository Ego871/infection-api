import { Request, Response } from 'express';
import { InfectionModel } from '../../../data/models/infection.model';

export class InfectionController {
    public registerInfection = async(req: Request, res: Response) => {
        try {
            const { lat, lng, gender, age } = req.body;
            const newInfection = await InfectionModel.create({
                lat,
                lng,
                gender,
                age
            });
            res.json(newInfection);
        } catch(error) {
            res.json({ message: "Error while registering new infection case"})
        }
    }


    public getInfections = async(req: Request, res: Response) => {
        try {
            const infections = await InfectionModel.find();
            return res.json(infections);
        } catch(error) {
            return res.json([]);
        }
    }

    public getLastWeekInfections = async(req: Request, res: Response) => {
        try {
            const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            const infections = await InfectionModel.find({ creationDate: { $gt: lastWeek }});
            return res.json(infections);
        } catch(error) {
            return res.json([]);
        }
    }

    public updateInfection = async(req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { lat, lng, isSent, gender, age, creationDate } = req.body;
            await InfectionModel.findByIdAndUpdate(id, {
                lat,
                lng,
                isSent,
                gender,
                age,
                creationDate
            });
            const updatedIncident = await InfectionModel.findById(id); // doing it like this is weird, but I don't remember the reasoning given, so just keep it
            return res.json(updatedIncident);
        } catch(error) {
            return res.json({ message: "Error while updating infection case"})
        }
    }

    public deleteInfection = async(req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await InfectionModel.findByIdAndDelete(id);
            return res.json({ message: "Infection case succesfully deleted"});
        } catch(error) {
            return res.json({ message: "Error while deleting infection case"});
        }
    }
}