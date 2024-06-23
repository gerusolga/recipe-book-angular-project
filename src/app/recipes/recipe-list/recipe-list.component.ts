import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipeService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onNewRecipe() {
    this.router.navigate(['/recipes/new']);
  }
  }


