import { Movie } from './movie.model';

describe('Movie Model', () => {
    it('should create a movie object with required fields', () => {
        const movie: Movie = {
            id: 1,
            title: 'Test Movie',
            release_date: '2020-01-01',
            poster_path: '/test.jpg',
            vote_average: 8.5
        };
        expect(movie.id).toBe(1);
        expect(movie.title).toBe('Test Movie');
        expect(movie.release_date).toBe('2020-01-01');
        expect(movie.poster_path).toBe('/test.jpg');
        expect(movie.vote_average).toBe(8.5);
    });

    it('should allow optional fields', () => {
        const movie: Movie = {
            id: 2,
            title: 'Optional Movie',
            release_date: '2020-02-02',
            poster_path: '/opt.jpg',
            vote_average: 7.2,
            overview: 'A test overview',
            genres: [{ id: 1, name: 'Action' }],
            runtime: 120,
            original_language: 'en'
        };
        expect(movie.overview).toBe('A test overview');
        expect(movie.genres?.[0].name).toBe('Action');
        expect(movie.runtime).toBe(120);
        expect(movie.original_language).toBe('en');
    });
});
