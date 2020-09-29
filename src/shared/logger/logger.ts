import { Injectable, LoggerService, Scope } from "@nestjs/common";
import { createLogger, format, transports, Logger} from "winston";
import winston = require("winston/lib/winston/config");
const{combine,timestamp, prettyPrint} = format;

@Injectable({scope: Scope.TRANSIENT})
export class MyLogger implements LoggerService {
    private logger:  Logger;
    constructor( ) {
        this.logger = createLogger({
            format: combine(
                timestamp(),
                prettyPrint()
            ),
            transports: [
                new transports.Console(),
                new transports.File({filename: 'error.log', level: 'error'}),
                new transports.File({filename: 'info.log', level: 'info'})
            ],
            exitOnError: false
        });
        
    }

    log(message: any, context?: string) {
        this.logger.info(message)
    }
    error(message: any, trace?: string, context?: string) {
    }
    warn(message: any, context?: string) {
    }
    debug?(message: any, context?: string) {
    }
    verbose?(message: any, context?: string) {
    }

}