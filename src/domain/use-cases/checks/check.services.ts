import { LogEntity, LogEntityOptions, SeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repostiories/log.repository';

interface CheckServicesUseCase{
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallBack = (error: string) => void;

export class CheckService implements CheckServicesUseCase{
    

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallBack: SuccessCallback,
        private readonly errorCallBack: ErrorCallBack
    ){}

    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);

            if(!req.ok){
                throw new Error(`Error on check service ${url}`)
            }

            const options: LogEntityOptions = {
                message: `Service ${url} working `,
                origin: 'check.service.ts',
                severityLevel: SeverityLevel.low,
            }

            const log: LogEntity = new LogEntity(options);
            this.logRepository.saveLog(log);
            this.successCallBack()

            return true;
        } catch (error) {
            const options: LogEntityOptions = {
                message: `${error}`,
                origin: "check.services.ts",
                severityLevel: SeverityLevel.high
            }

            const log: LogEntity = new LogEntity(options);
            this.logRepository.saveLog(log);
            this.errorCallBack(`${error}`)
            return false;
        }
    }
}