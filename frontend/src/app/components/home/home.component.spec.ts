import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from '../../components/home/home.component';
import { TmdbService } from '../../services/tmdb.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let tmdbServiceSpy: jasmine.SpyObj<TmdbService>;

    beforeEach(async () => {
        tmdbServiceSpy = jasmine.createSpyObj('TmdbService', ['getPopularMovies', 'searchMovies']);
        await TestBed.configureTestingModule({
            imports: [HomeComponent, RouterTestingModule],
            providers: [
                { provide: TmdbService, useValue: tmdbServiceSpy }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch popular movies on init', () => {
        const movies = [{ id: 1, title: 'Popular', release_date: '2020-01-01', poster_path: '', vote_average: 8 }];
        tmdbServiceSpy.getPopularMovies.and.returnValue(of({ results: movies, page: 1, total_pages: 1, total_results: 1 }));
        component.fetchPopular();
        expect(component.movies).toEqual(movies);
        expect(component.listTitle).toBe('Popular Movies');
    });

    it('should search movies', () => {
        const movies = [{ id: 2, title: 'Search', release_date: '2020-01-02', poster_path: '', vote_average: 7 }];
        tmdbServiceSpy.searchMovies.and.returnValue(of({ results: movies, page: 1, total_pages: 1, total_results: 1 }));
        component.searchTerm = 'Search';
        component.onSearch();
        expect(component.movies).toEqual(movies);
        expect(component.listTitle).toBe('Search Results');
    });

    it('should handle error on fetchPopular', () => {
        tmdbServiceSpy.getPopularMovies.and.returnValue(throwError(() => 'Error'));
        component.fetchPopular();
        expect(component.error).toBe('Error');
    });
});
