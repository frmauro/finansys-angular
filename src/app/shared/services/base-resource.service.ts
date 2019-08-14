import { BaseResourceModel } from "../models/base-resource.model";

import { Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { observable, throwError, Observable, BehaviorSubject } from "rxjs";
import { map, catchError } from "rxjs/operators";


export abstract class BaseResourceService<T extends BaseResourceModel>{

  protected http: HttpClient;
  //protected domainApi: string = "http://192.168.99.100:8080/"; // endereço do container docker
  protected domainApi: string = "http://localhost:54190/"; // endereço do localhost do VS
  protected domainApiAutentication: string = "http://localhost:3000/"; // endereco da api em nodejs para autenticação
  private fullApiPath = this.domainApi + this.apiPath;
  private fullApiPathAutentication = this.domainApiAutentication + this.apiPath;

  public currentUserSubject: BehaviorSubject<T>;
  public currentUser: Observable<T>;



  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
    this.currentUserSubject = new BehaviorSubject<T>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getAll(): Observable<T[]> {
    return this.http.get(this.fullApiPath).pipe(
      map(this.jasonDataToResources.bind(this)),
      catchError(this.handleError)
    )
  }

  getById(id: number): Observable<T> {
    const url = `${this.fullApiPath}/${id}`;
    return this.http.get(url).pipe(
      map(this.jasonDataToResource.bind(this)),
      catchError(this.handleError)
    )
  }

  create(resource: T): Observable<T> {
    let url = this.fullApiPath + "/";
    return this.http.post(url, resource).pipe(
      map(this.jasonDataToResource.bind(this)),
      catchError(this.handleError)
    )
  }

  update(resource: T): Observable<T> {
    const url = `${this.fullApiPath}/${resource.id}`;
    return this.http.put(url, resource).pipe(
      map(() => resource),
      catchError(this.handleError)
    )
  }

  delete(id: number): Observable<any> {
    const url = `${this.fullApiPath}/${id}`;
    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError)
    )
  }


  autentication(resource: T): Observable<any> {
    const url = this.fullApiPathAutentication;
    return this.http.post(url, resource).pipe(
      map(res => {
        let objJson = JSON.stringify(res);
        let obj = JSON.parse(objJson);
        let token = obj.token;
        if (obj && token) {
          localStorage.setItem('currentUser', JSON.stringify(obj));
          this.currentUserSubject.next(obj);
        }
        return obj;
      }
      ),
      catchError(this.handleError)
    );
  }



  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }



  //PROTECTED METHODS

  protected jasonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(element => resources.push(this.jsonDataToResourceFn(element)));
    return resources;
  }

  protected jasonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }



}