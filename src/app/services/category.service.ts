import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'

export interface Category {
    category_id: number,
    name: any,
    is_racing: boolean
}

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) { }

    public products(categoryId:number, pageSize:number, pageIndex:number) {
        return this.http.get<Category[]>(
            environment.apiURL + '/categories/' + categoryId + '/products?sort=-id&page[size]=' +  pageSize + '&page[number]=' + pageIndex);
    }

    public one(categoryId:number) {
        return this.http.get<Category>(environment.apiURL + '/categories/' + categoryId);
    }

}

