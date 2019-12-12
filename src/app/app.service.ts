import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Data } from './data';

@Injectable({
  providedIn: 'root'
})
export class AppService {

	private url = 'https://hn.algolia.com/api/v1/search_by_date?tags=story';
	private httpOptions = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};	

  constructor(private http: HttpClient) { }

  getData(): Observable<Data[]>
  {
  	return this.http.get<Data[]>(this.url)
  	.pipe(
  	  tap(_ => this.log('getData request')),
      catchError(this.handleError<Data[]>('getData', []))
    );
  }

  private log(message: string) {
	  console.log(message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {

	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead

	    // TODO: better job of transforming error for user consumption
	    this.log(`${operation} failed: ${error.message}`);

	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}
}
