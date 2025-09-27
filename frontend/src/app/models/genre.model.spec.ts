import { Genre } from './genre.model';

describe('Genre Model', () => {
    it('should create a genre object', () => {
        const genre: Genre = { id: 1, name: 'Action' };
        expect(genre.id).toBe(1);
        expect(genre.name).toBe('Action');
    });
});
