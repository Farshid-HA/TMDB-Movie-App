import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from '../models/movie.model';
import { MovieListResponse } from '../models/movie-list-response.model';
import { environment } from '../environment';

@Injectable({ providedIn: 'root' })
export class TmdbService {
    private backendBaseUrl = environment.backendBaseUrl;

    constructor(private http: HttpClient) { }

    getPopularMovies(page: number = 1): Observable<MovieListResponse> {
        return this.http.get<MovieListResponse>(`${this.backendBaseUrl}/popular`, {
            params: new HttpParams().set('page', page),
        }).pipe(catchError(this.handleError));
    }

    searchMovies(query: string, page: number = 1): Observable<MovieListResponse> {
        return this.http.get<MovieListResponse>(`${this.backendBaseUrl}/search`, {
            params: new HttpParams().set('query', query).set('page', page),
        }).pipe(catchError(this.handleError));
    }

    getMovieDetails(id: number): Observable<Movie> {
        return this.http.get<Movie>(`${this.backendBaseUrl}/details/${id}`)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        let msg = 'Cannot connect to server';
        if (error.error instanceof ErrorEvent) {
            msg = `Error: ${error.error.message}`;
        } else if (error.status) {
            msg = `Error ${error.status}: ${error.statusText}`;
        }
        return throwError(() => msg);
    }
}
