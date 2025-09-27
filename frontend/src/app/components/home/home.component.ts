import { Component } from '@angular/core';
import { environment } from '../../environment';
import { TmdbService } from '../../services/tmdb.service';
import { Movie } from '../../models/movie.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    movies: Movie[] = [];
    searchTerm = '';
    loading = false;
    error = '';
    listTitle = 'Popular Movies';

    readonly imageBaseUrl = environment.tmdbImageBaseUrl + 'w92';


    constructor(private tmdb: TmdbService, private router: Router) { }

    ngOnInit() {
        this.fetchPopular();
    }

    fetchPopular() {
        this.loading = true;
        this.listTitle = 'Popular Movies';
        this.tmdb.getPopularMovies().subscribe({
            next: res => { this.movies = res.results; this.loading = false; },
            error: err => { this.error = err; this.loading = false; }
        });
    }

    onSearch() {
        if (!this.searchTerm.trim()) {
            this.fetchPopular();
            return;
        }
        this.loading = true;
        this.listTitle = 'Search Results';
        this.tmdb.searchMovies(this.searchTerm).subscribe({
            next: res => { this.movies = res.results; this.loading = false; },
            error: err => { this.error = err; this.loading = false; }
        });
    }

    goToDetails(movie: Movie) {
        this.router.navigate(['/movie', movie.id]);
    }

    clearSearch() {
        this.searchTerm = '';
        this.onSearch();
    }
}
