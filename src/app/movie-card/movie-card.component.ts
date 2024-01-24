/**
 * Movie Card Component
 *
 * Angular component responsible for displaying movie cards, handling user interactions,
 * and managing movie details.
 *
 * Sections:
 * 1. Dependencies
 * 2. Image Path Mapping
 * 3. Component Definition and Initialization
 * 4. User Authentication and Movie Retrieval
 * 5. Movie and Genre Details
 * 6. Image URL Handling
 * 7. Favorite Movies Handling
 *
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
// movie-card.component.ts
import { SharedImageService } from '../shared-image.service';

//comment
// Mapping of ImagePaths to hosted URLs
/*const imagePathMapping: { [key: string]: string } = {
  'shawshankredemption.png': 'https://i.ibb.co/f0JB4nR/shawshankredemption.png',
  'pulpfiction.png': 'https://i.ibb.co/PFFksRY/pulpfiction.png',
  'forrestgump.png': 'https://i.ibb.co/51qJLVb/forrestgump.png',
  'inception.png': 'https://i.ibb.co/HFNL8G8/inception.png',
  'darkknight.png': 'https://i.ibb.co/N7cqh3S/darkknight.png',
  'schindlerslist.png': 'https://i.ibb.co/DKg1TGP/schindlerslist.png',
  'thegodfather.png': 'https://i.ibb.co/LxChkqh/thegodfather.png',
  'matrix.png': 'https://i.ibb.co/d4d7d9w/matrix.png',
  'fellowshipofthering.png': 'https://i.ibb.co/GdqGN2m/fellowshipofthering.png',
  'avengers.png': 'https://i.ibb.co/VMnhD2j/avengers.png',
  'avatar.png': 'https://i.ibb.co/wWnf0j1/avatar.png',
  'gladiator.png': 'https://i.ibb.co/NVDCF74/gladiator.png',
  'interstellar.png': 'https://i.ibb.co/0Q41dYq/interstellar.png',
  'killbill.png': 'https://i.ibb.co/7rMTV2Y/killbill.png',
  'thedeparted.png': 'https://i.ibb.co/sQNj3J6/thedeparted.png',
}; moved to shared image service */

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any; // Add a property to store user data

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private sharedImageService: SharedImageService 
  ) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    console.log('User data:', userString);
    console.log('Movies:', this.movies);
  
    if (!userString) {
      this.router.navigate(['welcome']);
      return;
    }
  
    this.user = JSON.parse(userString);  // Parse the user data
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  getGenreDetails(genre: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: genre.Name,
        content: genre.Description
      }
    });
  }

  getDirectorDetails(Director: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: Director.Name,
        content: Director.Bio
      }
    });
  }

  getMovieDetails(synopsis: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: 'Description',
        content: synopsis
      }
    });
  }

  getImageUrl(imagePath: string): string {
    return this.sharedImageService.getImageUrl(imagePath);
  }

  addFavorite(id: string): void {
    console.log('Adding to favorites. Movie ID:', id);
  
    this.fetchApiData.addFavoriteMovie(id).subscribe(
      () => {
        console.log('Successfully added to favorites.');
        this.snackBar.open('Added to favorite list', 'OK', { duration: 2000 });
        // Update the user's favorite movies locally
        this.user.FavoriteMovies.push(id);
        localStorage.setItem('user', JSON.stringify(this.user));
      },
      (error) => {
        console.error('Error adding to favorites:', error);
      }
    );
  }

  isFavorite(id: string): boolean {
    return this.user.FavoriteMovies.includes(id);
  }

  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Removed from favorite list', 'OK', {
        duration: 2000
      });
      this.user.FavoriteMovies = this.user.FavoriteMovies.filter(
        (movieId: string) => movieId !== id
      );
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }
}
