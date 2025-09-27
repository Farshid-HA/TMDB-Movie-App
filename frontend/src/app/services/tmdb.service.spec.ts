import { TmdbService } from './tmdb.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../environment';

describe('TmdbService', () => {
    let service: TmdbService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TmdbService]
        });
        service = TestBed.inject(TmdbService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch popular movies', () => {
        const dummyResponse = { results: [{ id: 1, title: 'Test', release_date: '2020-01-01', poster_path: '', vote_average: 8 }], page: 1, total_pages: 1, total_results: 1 };
        service.getPopularMovies().subscribe(res => {
            expect(res.results.length).toBe(1);
            expect(res.results[0].title).toBe('Test');
        });
        const req = httpMock.expectOne(`${environment.tmdbBaseUrl}/movie/popular?api_key=${environment.tmdbApiKey}&page=1`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyResponse);
    });

    it('should search movies', () => {
        const dummyResponse = { results: [{ id: 2, title: 'Search', release_date: '2020-01-02', poster_path: '', vote_average: 7 }], page: 1, total_pages: 1, total_results: 1 };
        service.searchMovies('Search').subscribe(res => {
            expect(res.results[0].id).toBe(2);
        });
        const req = httpMock.expectOne(`${environment.tmdbBaseUrl}/search/movie?api_key=${environment.tmdbApiKey}&query=Search&page=1`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyResponse);
    });

    it('should fetch movie details', () => {
        const dummyMovie = { id: 3, title: 'Detail', release_date: '2020-01-03', poster_path: '', vote_average: 9 };
        service.getMovieDetails(3).subscribe(res => {
            expect(res.id).toBe(3);
        });
        const req = httpMock.expectOne(`${environment.tmdbBaseUrl}/movie/3?api_key=${environment.tmdbApiKey}`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyMovie);
    });
});
