import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { observable, throwError, Observable } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

import { Category } from "./category.model";
import { element } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = "api/categories";

  constructor(private http: HttpClient) { }

getAll(): Observable<Category[]>{
  return this.http.get(this.apiPath).pipe(
    catchError(this.handleError),
    map(this.jasonDataToCategories)
  )
}

//PRIVATES METHODS

private jasonDataToCategories(jsonData: any[]): Category[]{
  const categories: Category[] = [];
  jsonData.forEach(element => categories.push(element as Category));
  return categories;
}

private handleError(error: any): Observable<any>{
  console.log("ERRO NA REQUISIÇÃO => ", error);
  return throwError(error);
}


}
