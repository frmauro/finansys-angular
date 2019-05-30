import { Injectable, Injector } from '@angular/core';
import { BaseResourceService  } from "../../../shared/services/base-resource.service";
import { CategoryService } from "../../categories/shared/category.service";
import { Entry } from "./entry.model";

import { observable, throwError, Observable } from "rxjs";
import { flatMap, catchError, map } from "rxjs/operators";

import * as moment from "moment"; 


@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {


  constructor(protected injector: Injector, private categoryService: CategoryService) {
    super("api/Entry", injector, Entry.fromJson);
   }


create(entry: Entry): Observable<Entry>{
   //return this.setCategoryAndSendToServer(entry, super.create.bind(this));
   return super.create(entry);
}

update(entry: Entry): Observable<Entry>{
  return this.setCategoryAndSendToServer(entry, super.update.bind(this));
}

getByMonthAndYear(month: number, year: number): Observable<Entry[]>{
  return this.getAll().pipe(
    map(entries => this.filterByMonthAndYear(entries, month, year))
  )
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

private filterByMonthAndYear(entries: Entry[], month: number, year: number){
  return entries.filter(entry => {
    const entryDate = moment(entry.date, "DD/MM/YYYY")
    const monthMatches = entryDate.month() + 1 == month;

    let m = entryDate.month();

    const yearMatches = entryDate.year() == year;

    if (monthMatches && yearMatches) return entry;
  })
}



}
