import {Component, OnInit} from '@angular/core';
import {DataStorageService} from "./shared/data-storage.service";
import {AuthService} from "./auth/auth.service";
import {Recipe} from "./recipes/recipe.model";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  loading = true;
  recipes: Recipe[] = [];

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user) {
        this.dataStorageService.fetchRecipes().subscribe(recipes => {
          this.recipes = recipes;
          this.loading = false;
        }, error => {
          console.error('Error fetching recipes:', error);
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
      const spinner = document.getElementById('global-spinner');
      if (spinner) {
        spinner.style.display = 'none';
      }
    });
    }
  }

