import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, Observable, of, catchError, map } from 'rxjs';
import { Stand } from './models/stand';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(  private http: HttpClient,) {

  }
 
 
  standUrl = "http://localhost:4000/api/test"
  baseUrl = "http://localhost:4000/api/";
 







  /** GET Standes from the server */
  getStandes(): Observable<Stand[]> {
    return this.http.get<Stand[]>(this.standUrl)
      .pipe(
        tap(_ => this.log('fetched Standes')),
        catchError(this.handleError<Stand[]>('getStandes', []))
      );
  }

  /** GET Stand by id. Return `undefined` when id not found */
  getStandNo404<Data>(id: number): Observable<Stand> {
    const url = `${this.standUrl}/?id=${id}`;
    return this.http.get<Stand[]>(url)
      .pipe(
        map(stands => stands[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} Stand id=${id}`);
        }),
        catchError(this.handleError<Stand>(`getStand id=${id}`))
      );
  }

  /** GET Stand by id. Will 404 if id not found */
  getStand(id: number): Observable<Stand> {
    const url = `${this.standUrl}/${id}`;
    return this.http.get<Stand>(url).pipe(
      tap(_ => this.log(`fetched Stand id=${id}`)),
      catchError(this.handleError<Stand>(`getStand id=${id}`))
    );
  }

  /* GET Standes whose name contains search term */
  searchStandes(term: string): Observable<Stand[]> {
    if (!term.trim()) {
      // if not search term, return empty Stand array.
      return of([]);
    }
    return this.http.get<Stand[]>(`${this.standUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found Standes matching "${term}"`) :
         this.log(`no Standes matching "${term}"`)),
      catchError(this.handleError<Stand[]>('searchStandes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Stand to the server */
  addStand(Stand: Stand): Observable<Stand> {
    return this.http.post<Stand>(this.standUrl, Stand, this.httpOptions).pipe(
      tap((newStand: Stand) => this.log(`added Stand w/ id=${newStand.id}`)),
      catchError(this.handleError<Stand>('addStand'))
    );
  }

  /** DELETE: delete the Stand from the server */
  deleteStand(id: number): Observable<Stand> {
    const url = `${this.standUrl}/${id}`;

    return this.http.delete<Stand>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Stand id=${id}`)),
      catchError(this.handleError<Stand>('deleteStand'))
    ); 
  }

  /** PUT: update the Stand on the server */
  updateStand(Stand: Stand): Observable<any> {
    return this.http.put(this.standUrl, Stand, this.httpOptions).pipe(
      tap(_ => this.log(`updated Stand id=${Stand.id}`)),
      catchError(this.handleError<any>('updateStand'))
    );
  }
  
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

       

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.

      return of(result);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.warn(`HeroService: ${message}`);
  }
}
