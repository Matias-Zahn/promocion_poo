import { CheckService } from "../domain/use-cases/checks/check.services";
import { FileSystemRepository } from "../infrastructure/repostiories/fyleSystem.repository";
import { CronService } from "./cron/cron.service";


const fileSystemRepository = new FileSystemRepository()

export class Server{

    public static start(){
        CronService.startJob(
            "*/3 * * * * *",

            () => {
                new CheckService(
                    fileSystemRepository,
                    () => console.log("Success"),
                    (error) => console.log(error)
                ).execute("https://google.com");
            }
        );
    }
}