import express from 'express';
import { envs } from './config/envs.plugin';
import { MongoDatabase } from './data/init';
import { AppRoutes } from './presentation/routes';
import { emailJob } from './domain/jobs/email.job';

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);

(async () => await MongoDatabase.connect(
    {
        mongoUrl: envs.MONGO_URL ?? "",
        dbName: "InfectionApi"
    }))();

console.log(envs.PORT);
console.log(envs.MONGO_URL);

app.listen(envs.PORT, () => {
    console.log("Server is running");
    emailJob();
});