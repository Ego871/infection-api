import cron from 'node-cron';
import { InfectionModel } from '../../data/models/infection.model';
import { EmailService } from '../services/email.service';
import { generateInfectionEmailTemplate } from '../templates/email.template';
import { envs } from '../../config/envs.plugin';

export const emailJob = () => {
    const emailService = new EmailService();
    cron.schedule('*/10 * * * * *', async () => {
        try {
            const infections = await InfectionModel.find({ isSent: false });
            if(!infections.length) {
                console.log("No infection cases pending to be sent");
                return;
            }
            console.log(`Processing: ${infections.length} infection cases.`);
            await Promise.all(
                infections.map(async (infection) => {
                    try {
                        const html = generateInfectionEmailTemplate(
                            infection.lat,
                            infection.lng,
                            infection.gender,
                            infection.age,
                            infection.creationDate
                        );
                        await emailService.sendEmail({
                            to: envs.MAIL_USER,
                            subject: `Infection case with ID: ${infection._id}`,
                            html: html
                        });
                        console.log(`Email sent for infection case with ID: ${infection._id}`);
                        let updateInfection = {
                            lat: infection.lat,
                            lng: infection.lng,
                            isSent: true,
                            gender: infection.gender,
                            age: infection.age,
                            creationDate: infection.creationDate
                        };
                        await InfectionModel.findByIdAndUpdate(infection._id, updateInfection);
                        console.log(`Succesfully updated infection case with ID: ${infection._id}`);
                    } catch(error) {
                        console.error("Error while processing infection case");
                    }
                })
            );
        } catch (error) {
            console.error("Error while sending mails");
        }
    });
};
