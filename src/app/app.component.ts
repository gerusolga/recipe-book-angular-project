import {Component, OnInit} from '@angular/core';
import {DataStorageService} from "./shared/data-storage.service";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {


  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user) {
        this.dataStorageService.fetchRecipes().subscribe(recipes => {
          console.log('Fetched recipes in app component:', recipes);
        }, error => {
          console.error('Error fetching recipes:', error);
        });
      } else {
        this.dataStorageService.clearRecipes();
      }
    });
    }
  }

