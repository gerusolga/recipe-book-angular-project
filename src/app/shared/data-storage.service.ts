import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(`${environment.firebaseConfig.databaseURL}/recipes.json`, recipes)
      .subscribe(response => {
        console.log(response);
      })
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(`${environment.firebaseConfig.databaseURL}/recipes.json`)
      .pipe(
        tap(recipes => {
          console.log('Raw fetched recipes:', recipes); // Логирование всех загруженных рецептов
        }),
        map(recipes => {
          if (!recipes) {
            return [];
          }
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          console.log('Processed fetched recipes:', recipes); // Логирование обработанных рецептов
          this.recipeService.setRecipes(recipes);
        })
      );
  }
  clearRecipes() {
    this.recipeService.setRecipes([]);
  }
}
