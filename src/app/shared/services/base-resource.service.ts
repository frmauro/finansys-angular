import { BaseResourceModel } from "../models/base-resource.model";

import { Injector  } from "@angular/core";
import { HttpClient  } from "@angular/common/http";

import { observable, throwError, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";


export abstract class BaseResourceService<T extends BaseResourceModel>{

  protected http: HttpClient;
  //protected domainApi: string = "http://192.168.99.100:8080/"; // endereço do container docker
  protected domainApi: string = "http://localhost:54190/"; // endereço do localhost do VS
  private fullApiPath = this.domainApi + this.apiPath;
  

  constructor(
    protected apiPath: string, 
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
    )
    {
      this.http = injector.get(HttpClient);
    }

    getAll(): Observable<T[]>{
        return this.http.get(this.fullApiPath).pipe(
          map(this.jasonDataToResources.bind(this)),
          catchError(this.handleError)
        )
      }
      
      getById(id: number): Observable<T>{
        const url = `${this.fullApiPath}/${id}`;
        return this.http.get(url).pipe(
          map(this.jasonDataToResource.bind(this)),
          catchError(this.handleError)
        )  	
      }
      
      create(resource: T): Observable<T>{
        let url = this.fullApiPath + "/";
        return this.http.post(url, resource).pipe(
          map(this.jasonDataToResource.bind(this)),
          catchError(this.handleError)
        )
      }
      
      update(resource: T): Observable<T>{
        const url = `${this.fullApiPath}/${resource.id}`;
        return this.http.put(url, resource).pipe(
          map(() => resource),
          catchError(this.handleError)
        )
      }
      
      delete(id: number): Observable<any>{
        const url = `${this.fullApiPath}/${id}`;
        return this.http.delete(url).pipe(
          map(() => null),
          catchError(this.handleError)
        )
      }



      //PROTECTED METHODS

protected jasonDataToResources(jsonData: any[]): T[]{
    const resources: T[] = [];
    jsonData.forEach(element => resources.push(this.jsonDataToResourceFn(element)));
    return resources;
  }
  
  protected jasonDataToResource(jsonData: any): T{
    return this.jsonDataToResourceFn(jsonData);
  }
  
  protected handleError(error: any): Observable<any>{
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }
  
      
      
}