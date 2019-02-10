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

getById(id: number): Observable<Category>{
  const url = `${this.apiPath}/${id}`;
  return this.http.get(url).pipe(
    catchError(this.handleError),
    map(this.jasonDataToCategory)
  )  	
}

create(category: Category): Observable<Category>{
  this.http.post(this.apiPath, category).pipe(
    catchError(this.handleError),
    map(this.jasonDataToCategory)
  )
}

update(category: Category): Observable<Category>{
  const url = `${this.apiPath}/${category.id}`;
  return this.http.put(url, category).pipe(
    catchError(this.handleError),
    map(() => category)
  )
}

delete(id: number): Observable<any>{
  const url = `${this.apiPath}/${id}`;
  return this.http.delete(url).pipe(
    catchError(this.handleError),
    map(() => null)
  )
}





//PRIVATES METHODS

private jasonDataToCategories(jsonData: any[]): Category[]{
  const categories: Category[] = [];
  jsonData.forEach(element => categories.push(element as Category));
  return categories;
}

private jasonDataToCategory(jsonData: any): Category{
  return jsonData as Category;
}

private handleError(error: any): Observable<any>{
  console.log("ERRO NA REQUISIÇÃO => ", error);
  return throwError(error);
}


}
