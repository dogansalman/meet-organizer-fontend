import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';


@Injectable()

export class HttpService {
    private apiUrl = "http://localhost:8000";
    private header = {
        'Content-Type': 'application/json'
    };

    constructor(private client: HttpClient) {}

    
    public get(url: string, option: any): Observable<any> {
        return this.client.get(`${this.apiUrl}/${url}`, Object.assign(this.header, option));
    }
    public post(url: string, data:any): Observable<any> {
        console.log(`${this.apiUrl}/${url}`)
        return this.client.post(`${this.apiUrl}/${url}`, data);
    }
}