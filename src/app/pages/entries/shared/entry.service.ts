import { Injectable, Injector } from '@angular/core';
import { BaseResourceService  } from "../../../shared/services/base-resource.service";
import { CategoryService } from "../../categories/shared/category.service";
import { Entry } from "./entry.model";

import { observable, throwError, Observable } from "rxjs";
import { flatMap, catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {


  constructor(protected injector: Injector, private categoryService: CategoryService) {
    super("api/entries", injector, Entry.fromJson);
   }


create(entry: Entry): Observable<Entry>{
   return this.setCategoryAndSendToServer(entry, super.create.bind(this));
}

update(entry: Entry): Observable<Entry>{
  return this.setCategoryAndSendToServer(entry, super.update.bind(this));
}

private setCategoryAndSendToServer(entry: Entry, sendfn: any): Observable<Entry>{
  return this.categoryService.getById(entry.categoryId).pipe(
    flatMap(category => {
        entry.category = category;
        return sendfn(entry)
    }),
    catchError(this.handleError)
  )
}



}