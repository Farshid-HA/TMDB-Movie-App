import { Component, OnInit } from '@angular/core';
import { environment } from '../../environment';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { Movie } from '../../models/movie.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-movie-details',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
    movie?: Movie;
    loading = false;
    error = '';

    readonly imageBaseUrl = environment.tmdbImageBaseUrl + 'w500';

    constructor(private route: ActivatedRoute, private tmdb: TmdbService, private router: Router) { }

    goBack() {
        this.router.navigate(['/']);
    }

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (id) {
            this.loading = true;
            this.tmdb.getMovieDetails(id).subscribe({
                next: m => { this.movie = m; this.loading = false; },
                error: err => { this.error = err; this.loading = false; }
            });
        }
    }

    get runtimeStr() {
        if (!this.movie?.runtime) return '';
        const h = Math.floor(this.movie.runtime / 60);
        const m = this.movie.runtime % 60;
        return `${h}h ${m}m`;
    }
}
