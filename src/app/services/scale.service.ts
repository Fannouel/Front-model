import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpParams} from "@angular/common/http";

export interface Scale {
    scale_id: number
    name: string
    position: number
}

@Injectable({
    providedIn: 'root'
})
export class ScaleService {

    constructor(private http: HttpClient) { }

    public all(args?:any) {
        // if we have params
        // const httpParams:HttpParams = new HttpParams().set('params', JSON.stringify(params));
        const params:HttpParams = new HttpParams();
        if(args) {
            params.set('params', JSON.stringify(args));
        }
        return this.http.get<Scale[]>(environment.apiURL + "/scales", {params});
    }
}
