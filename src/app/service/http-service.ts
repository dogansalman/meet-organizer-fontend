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
        return this.client.post(`${this.apiUrl}/${url}`, data);
    }
    public put(url: string, data:any): Observable<any> {
        return this.client.put(`${this.apiUrl}/${url}`, data);
    }
    public delete(url: string): Observable<any> {
        return this.client.delete(`${this.apiUrl}/${url}`);
    }
}