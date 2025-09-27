import { MovieListResponse } from './movie-list-response.model';

describe('MovieListResponse Model', () => {
    it('should create a movie list response object', () => {
        const response: MovieListResponse = {
            page: 1,
            results: [
                { id: 1, title: 'Test', release_date: '2020-01-01', poster_path: '/test.jpg', vote_average: 8.5 }
            ],
            total_pages: 10,
            total_results: 100
        };
        expect(response.page).toBe(1);
        expect(response.results.length).toBe(1);
        expect(response.total_pages).toBe(10);
        expect(response.total_results).toBe(100);
    });
});
