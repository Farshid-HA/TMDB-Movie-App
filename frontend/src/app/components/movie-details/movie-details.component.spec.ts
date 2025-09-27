
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { TmdbService } from '../../services/tmdb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Movie } from '../../models/movie.model';

describe('MovieDetailsComponent', () => {
    let component: MovieDetailsComponent;
    let fixture: ComponentFixture<MovieDetailsComponent>;
    let tmdbServiceSpy: jasmine.SpyObj<TmdbService>;
    let router: Router;

    beforeEach(async () => {
        tmdbServiceSpy = jasmine.createSpyObj('TmdbService', ['getMovieDetails']);
        await TestBed.configureTestingModule({
            imports: [MovieDetailsComponent, RouterTestingModule],
            providers: [
                { provide: TmdbService, useValue: tmdbServiceSpy },
                { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(MovieDetailsComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch movie details on init', () => {
        const movie: Movie = { id: 1, title: 'Test', release_date: '2020-01-01', poster_path: '/poster.jpg', vote_average: 8 };
        tmdbServiceSpy.getMovieDetails.and.returnValue(of(movie));
        component.ngOnInit();
        expect(component.movie).toEqual(movie);
        expect(component.loading).toBeFalse();
    });

    it('should handle error on fetch', () => {
        tmdbServiceSpy.getMovieDetails.and.returnValue(throwError(() => 'Error'));
        component.ngOnInit();
        expect(component.error).toBe('Error');
        expect(component.loading).toBeFalse();
    });

    it('should navigate back to home on goBack()', () => {
        spyOn(router, 'navigate');
        component.goBack();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should format runtime correctly', () => {
        component.movie = { id: 1, title: '', release_date: '', poster_path: '', vote_average: 0, runtime: 125 };
        expect(component.runtimeStr).toBe('2h 5m');
    });

    it('should return empty runtime string if runtime is missing', () => {
        component.movie = { id: 1, title: '', release_date: '', poster_path: '', vote_average: 0 };
        expect(component.runtimeStr).toBe('');
    });

    it('should have correct imageBaseUrl', () => {
        expect(component.imageBaseUrl).toContain('https://image.tmdb.org/t/p/w500');
    });
});

