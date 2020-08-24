import {IncomingMessage} from 'http';
import {parse} from 'url';
import {ParsedRequest} from './types';

export function parseRequest(req: IncomingMessage) {
    const { query } = parse(req.url || '/', true);
    const { city, salary, companyName, logoUrl, title } = (query || {});


    const parsedRequest: ParsedRequest = {
        fileType: 'png',
        city: decodeURIComponent(city as string || ''),
        salary: decodeURIComponent(salary as string || ''),
        companyName: decodeURIComponent(companyName as string || ''),
        logoUrl: decodeURIComponent(logoUrl as string || ''),
        title: decodeURIComponent(title as string || ''),
    };
    return parsedRequest;
}
