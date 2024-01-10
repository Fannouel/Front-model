import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticConfigService {
  static config: any = null
  static isConfigLoading = false

  constructor(private http: HttpClient) { }

  public get(configName:string){
    StaticConfigService.isConfigLoading = true
    const url = environment.imagesURL + '/website_assets/schuco/config/' + configName + '.json'
    return this.http.get<any>(url);
  }
}
