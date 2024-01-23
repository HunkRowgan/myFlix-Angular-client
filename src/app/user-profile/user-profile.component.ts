// user-profile.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedImageService } from '../shared-image.service';

type User = {
  _id?: any;
  Username?: any;
  Password?: any;
  Email?: any;
  Bio?: any;
  FavoriteMovies?: any[];
  [key: string]: any; // Allowing additional properties
};

interface Movie {
  Actors: string[];
  Description: string;
  Director: { Name: string; Bio: string; Birth: string; Death: string | null };
  Featured: boolean;
  Genre: { Name: string; Description: string };
  ImagePath: string;
  ReleaseYear: string;
  Title: string;
  _id: string;
  
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: User = {};
  favoriteMovieIds: string[] = []; // Array to store only the IDs of favorite movies
  favoriteMovies: Movie[] = [];
  userData = { Username: '', Password: '', Email: '', Bio: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
    private sharedImageService: SharedImageService
  ) {}

  
  ngOnInit(): void {
    const user = this.getUser();

    if (!user._id) {
      this.router.navigate(['welcome']);
      return;
    }

    this.user = user;
    this.userData = {
      Username: user.Username || '',
      Email: user.Email || '',
      Password: '',
      Bio: user.Bio || '',
    };

    // get favorite movies
    this.fetchApiData.getFavoriteMovies().subscribe((favoriteMovies: Movie[]) => {
      this.favoriteMovies = favoriteMovies;
      console.log("1", favoriteMovies)

      // get all movies
this.fetchApiData.getAllMovies().subscribe((resp: any) => {
  const movies = resp;
  this.favoriteMovies = []; // Clear the array
  movies.forEach((movie: any) => {
    if (this.user.FavoriteMovies?.includes(movie._id)) {
      this.favoriteMovies.push(movie);
      console.log("favs", favoriteMovies);
    }
  });
});
    });
  }

  getImageUrl(imagePath: string): string {
    return this.sharedImageService.getImageUrl(imagePath);
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      console.log(result);
      localStorage.setItem('user', JSON.stringify(result));
      this.user = result;
      this.snackBar.open('Data successfully updated!', 'OK', {
        duration: 2000,
      });
    });
  }

  deleteUser(): void {
    if (confirm('Sure?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Successfully deleted', 'OK', { duration: 2000 });
      });

      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
      });

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}


