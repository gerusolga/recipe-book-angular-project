import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {RecipeService} from "../recipes/recipe.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{

  private userSub:Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    const recipes = this.recipeService.getRecipes();
    this.dataStorageService.storeRecipes(recipes)
      .subscribe(
        (response: Response) => {
      console.log(response);
    },
    (error: any) => {
      console.error(error);
    }
  );
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  goHome() {
    this.router.navigate(['/']);
  }
}
