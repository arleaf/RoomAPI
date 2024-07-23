import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from 'uuid';
//Middleware is software inserted between the request and response:

const getProcessingTimeInMS = (time: [number, number]): string => {
    return `${(time[0] * 1000 + time[1] / 1e6).toFixed(2)}ms`
}

/* 
add logs for an API endpoint using the following pattern
 [id][timestamp] method:url START Processing
 [id][timestamp] method:url response.statusCode END Processing

 @param req Express.Request
  @param res Express.Response
   @param next Express.NextFunction
 */
export default function logger(req: Request, res: Response, next: NextFunction) {
    //generate unique id
    const id = uuidv4();
    //get timestamp
    const now = new Date();
    const timestamp = [now.getFullYear(), '-', now.getMonth() + 1, '-', now.getDate(), ' ', now.getHours(), ':', now.getMinutes(), ':', now.getSeconds()]
        .join(' ');
    //get API endpoint
    const { method, url } = req;
    //log start of execution process
    const start = process.hrtime();
    const startText = `START:${getProcessingTimeInMS(start)}`;
    const idText = `[${id}]`;
    const timestampText = `[${timestamp}]`;
    //show entry
    console.log(`${idText}${timestampText} ${method}:${url} ${startText}`);
    //trigger once response is sent to client
    res.once('finish', () => {
        const end = process.hrtime(start);
        const endText = `END:${getProcessingTimeInMS(end)}`;
        console.log(`${idText}${timestampText} ${method}:${url} ${res.statusCode} ${endText}`);
    });
    //execute next middeleware/event handler
    next();
}

