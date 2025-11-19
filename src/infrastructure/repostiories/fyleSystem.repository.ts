
import { LogEntity, SeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from "../../domain/repostiories/log.repository";
import fs from 'fs'


export class FileSystemRepository extends LogRepository{
    
    private readonly logPath = "logs/"
    private readonly allLogsPath = "logs/logs-all.log"
    private readonly mediumLogs = "logs/logs-medium.log"
    private readonly highLogs = "logs/logs-high.log"


    constructor(){
        super();
        this.createLogsFile()
    }


    private createLogsFile(){
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath)
        }


        [this.allLogsPath, this.mediumLogs, this.highLogs].forEach( (path) => {
            if(fs.existsSync(path)){
                return
            }

            fs.writeFileSync(path, "", 'utf8')
        })
    }
    


    override async saveLog(log: LogEntity): Promise<void> {

        const logAsJSON = `${JSON.stringify(log, null, 2)}\n`;

        if(log.getSeverityLevel === SeverityLevel.low){
            // fs.appendFileSync(this.allLogsPath, logAsJSON)  AQUI POR SI SE QUIEREN GRABAR TODOS LOS LOGS
            return
        }

        if(log.getSeverityLevel === SeverityLevel.medium ) {
            fs.appendFileSync(this.mediumLogs, logAsJSON)
        }else {
            fs.appendFileSync(this.highLogs, logAsJSON)
        }


    }


    private readLogsFile(path: string){
        const content = fs.readFileSync(path, 'utf8');
        const log = content.split('\n').map(( log) => LogEntity.fromJson(log))

        return log;
    }


    override async getLogs(severityLevel: SeverityLevel): Promise<LogEntity[]> {

        switch (severityLevel){
            case SeverityLevel.low:
                return this.readLogsFile(this.allLogsPath);
            case SeverityLevel.medium:
                return this.readLogsFile(this.mediumLogs)
            case SeverityLevel.high:
                return this.readLogsFile(this.highLogs);

            default:
                throw new Error(`Severity log: ${severityLevel} not implement`)
        }

    }

}