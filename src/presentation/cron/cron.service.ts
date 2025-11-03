import { CronJob } from "cron";

type OnTick = () => void;
type CronTime = string | Date
export class CronService{

    public static startJob(cronTime: CronTime, onTick: OnTick): CronJob{
        const job = CronJob.from({cronTime, onTick})
        job.start()

        return job
    }

}