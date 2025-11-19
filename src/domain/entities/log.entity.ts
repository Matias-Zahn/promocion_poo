export enum SeverityLevel{
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    message: string;
    severityLevel: SeverityLevel;
    createdAt?: Date;
    origin: string;
}


export class LogEntity{

    private message: string;
    private severityLevel: SeverityLevel;
    private createdAt?: Date;
    private origin: string;


    constructor( options: LogEntityOptions ){
        const { message, severityLevel, createdAt = new Date(), origin, } = options;
    
        this.severityLevel = severityLevel,
        this.createdAt = createdAt,
        this.message = message,
        this.origin = origin
    }


    public static fromJson(json: string): LogEntity{
        const { message, severityLevel, createdAt } = JSON.parse(json);

        const log = new LogEntity({
        message,
        severityLevel,
        origin,
        createdAt,
        });

        return log;
    }


    get getSeverityLevel(): SeverityLevel{
        return this.severityLevel;
    }


    set setSeverytLevel(newSeverityLevel: SeverityLevel) {
        this.severityLevel = newSeverityLevel;
    }

}